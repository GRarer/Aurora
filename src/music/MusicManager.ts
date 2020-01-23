import { Chord, ChordQualities, ChordMotion } from './Chords.js';
import { Note } from './Notes.js';
import { Arrays } from '../util/Arrays.js';
import Instrument from './Instrument.js';
import { AdsrOscillatorInstrument } from './Instruments.js';
import { Random } from '../util/Random.js';
import { Drumkit, Drums } from './Drums.js';

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
        arp: new AdsrOscillatorInstrument(
            {type: 'sawtooth', detune: 3},
            {attack: 0.01, decay: 0.05, sustain: 0.0, release: 0.1}
        ),
        bass: new AdsrOscillatorInstrument(
            {type: 'triangle', detune: 2},
            {attack: 0.01, decay: 0.01, sustain: 1.0, release: 0.1}
        ),
        pad: new AdsrOscillatorInstrument(
            {type: 'triangle', detune: 4},
            {attack: 1.0, decay: 1.0, sustain: 0.5, release: 0.5}
        )
    }

    static masterGain: GainNode;
    static drumkit: Drumkit;

    static initialize(): void {
        this.context = new AudioContext();
        this.masterGain = this.context.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.context.destination);
        this.drumkit = new Drumkit();
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
        const beatLength: number = 60 / this.beatsPerMinute;
        let offsetTime: number = 0;
        const drumLoop: Drums[] = [Drums.KICK, Drums.CLOSED_HI_HAT, Drums.SNARE, Drums.OPEN_HI_HAT];
        for (let i = 0; i < drumLoop.length; i++) {
            this.scheduleDrum(startingTime + offsetTime, drumLoop[i]);
            offsetTime += beatLength;
        }
        window.setTimeout(() => {
            this.queueNextMeasures(startingTime + offsetTime, startingChord);
        }, (startingTime + offsetTime - this.context.currentTime - 0.2) * 1000);
    }

    //shift note through the octaves until it ends up between min and max
    private static constrainNote(note: number, min: number, max: number): number {
        while (note < min) {
            note += 12;
        }
        while (note > max) {
            note -= 12;
        }
        return note;
    }

    //shift notes through octaves so they end up between min and max inclusive
    private static constrainNotes(notes: number[], min: number, max: number): number[] {
        return notes.map(note => this.constrainNote(note, min, max));
    }

    private static scheduleNote(note: Note, inst: Instrument): void {
        const instOut: AudioNode = inst.scheduleNote(this.context, note);
        instOut.connect(this.masterGain);
    }

    private static scheduleDrum(start: number, drum: Drums): void {
        const drumOut: AudioNode = this.drumkit.scheduleHit(this.context, start, drum);
        drumOut.connect(this.masterGain);
    }

}
