import { Chord, ChordQualities, ChordMotion } from './Chords.js';
import { Notes } from './Notes.js';
import { Arrays } from '../util/Arrays.js';
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

    static initialize(): void {
        this.context = new AudioContext();
        this.queueNextMeasures(this.context.currentTime, new Chord(60, ChordQualities.MINOR7));
        console.log(this.generateProgression(new Chord(60, ChordQualities.MINOR7), 100).map(chord => chord.toString()).join(' -> '));
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
            const notes: number[] = progression[i].notes;
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < notes.length; k++) {
                    this.scheduleNote(notes[k], startingTime + offsetTime);
                    offsetTime += beatLength;
                }
            }
        }
        window.setTimeout(() => {
            this.queueNextMeasures(startingTime + offsetTime, progression[progression.length - 1]);
        }, (startingTime + offsetTime - this.context.currentTime - 0.2) * 1000);
    }

    private static scheduleNote(note: number, start: number): void {
        const freq: number = Notes.midiNumberToFrequency(note);
        const osc: OscillatorNode = this.context.createOscillator();
        osc.type = 'square';
        const gain: GainNode = this.context.createGain();
        const duration: number = 0.05;
        osc.frequency.value = freq;
        osc.start(start);
        osc.stop(start + duration);
        osc.connect(gain);
        gain.gain.setValueAtTime(1, start);
        gain.gain.linearRampToValueAtTime(0, start + duration);
        gain.connect(this.context.destination);
    }

}
