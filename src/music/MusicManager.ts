import { Chord, ChordQualities, ChordMotion } from './Chords.js';
import { Notes } from './Notes.js';
import { Arrays } from '../util/Arrays.js';
import Instrument from './Instrument.js';
import { EnvOscInstrument } from './Instruments.js';
import { Random } from '../util/Random.js';

export default class MusicManager {

    static beatsPerMinute: number = 220;
    static context: AudioContext;
    static motions: ChordMotion[] = [
        //dominant function
        new ChordMotion([ChordQualities.DOM7], [-1, -7, 5], [ChordQualities.DOM7, ChordQualities.MAJOR7, ChordQualities.MINOR7]),
        //proximate harmony :)
        new ChordMotion([ChordQualities.MAJOR7, ChordQualities.MINOR7], [-2, 2], [ChordQualities.DOM7, ChordQualities.MAJOR7, ChordQualities.MINOR7]),
    ];

    static instruments = {
        arp: new EnvOscInstrument('square', 0.01, 0.05, 0.0, 0.1)
    }

    static masterGain: GainNode;

    static initialize(): void {
        this.context = new AudioContext();
        this.masterGain = this.context.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.context.destination);
        this.queueNextMeasures(this.context.currentTime, new Chord(60, ChordQualities.MINOR7));
    }

    static setVolume(volume: number): void {
        this.masterGain.gain.value = volume;
    }

    private static generateProgression(from: Chord, length: number): Chord[] {
        const result: Chord[] = [];
        for (let i = 0; i < length; i++) {
            const allowedMotions = this.motions.filter(motion => motion.canStartOn(from));
            const next: Chord = Random.fromArray(allowedMotions).nextFrom(from);
            result.push(next);
            from = next;
        }
        return result;
    }

    private static queueNextMeasures(startingTime: number, startingChord: Chord): void {
        const progression: Chord[] = this.generateProgression(startingChord, 2);
        console.log(`chords: ${progression.map(chord => chord.toString()).join(', ')}`);
        const beatLength: number = 60 / this.beatsPerMinute;
        let offsetTime: number = 0;
        for (let i = 0; i < progression.length; i++) {
            const notes: number[] = this.constrainNotes(progression[i].notes, 60, 72).sort((a: number, b: number) => a - b);
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < notes.length; k++) {
                    this.scheduleNote(notes[k], 0.2, startingTime + offsetTime, this.instruments.arp);
                    offsetTime += beatLength;
                }
            }
        }
        window.setTimeout(() => {
            this.queueNextMeasures(startingTime + offsetTime, progression[progression.length - 1]);
        }, (startingTime + offsetTime - this.context.currentTime - 0.2) * 1000);
    }

    //shift notes through octaves so they end up between min and max inclusive
    private static constrainNotes(notes: number[], min: number, max: number): number[] {
        return notes.map(note => {
            while (note < min) {
                note += 12;
            }
            while (note > max) {
                note -= 12;
            }
            return note;
        });
    }

    private static scheduleNote(note: number, duration: number, start: number, inst: Instrument): void {
        const instOut: AudioNode = inst.scheduleNote(this.context, note, duration, start);
        instOut.connect(this.masterGain);
    }

}
