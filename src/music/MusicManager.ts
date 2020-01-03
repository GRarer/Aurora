import { Chord, ChordQualities } from './Chords.js';
import { Notes } from './Notes.js';
import { Arrays } from '../util/Arrays.js';

export default class MusicManager {

    static beatsPerMinute: number = 220;
    static context: AudioContext;

    static initialize(): void {
        this.context = new AudioContext();
        this.queueNextMeasures(this.context.currentTime);
    }

    private static queueNextMeasures(startingTime: number): void {
        //this is a pretty standard i -> bVII vamp
        //just until i get chord generation working
        const progression: Chord[] = [
            new Chord(60, ChordQualities.MINOR7),
            new Chord(58, ChordQualities.DOM7)
        ];
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
            this.queueNextMeasures(startingTime + offsetTime);
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
