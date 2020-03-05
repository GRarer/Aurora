import { mod } from "../util/Util.js";

export interface Note {

    note: number; // the MIDI number of the note
    start: number; // starting time in seconds
    duration: number; // duration in seconds
    endNote?: number; // MIDI number of note to end on. if undefined, this has no effect

}

export namespace Notes {

    export const noteNames: string[] = [
        "C", "C#", "D", "D#", "E", "F",
        "F#", "G", "G#", "A", "A#", "B"
    ];

    export function midiNumberToFrequency(note: number): number {
        return Math.pow(2, (note - 69) / 12) * 440;
    }

    export function midiNumberToNoteName(note: number): string {
        return `${noteNames[mod(note, 12)]}${Math.floor(note / 12) - 1}`;
    }

    export function detuneWithCoeff(note: number, detuneCoeff: number): number[] {
        if (detuneCoeff === 1) {
            return [midiNumberToFrequency(note)];
        } else {
            const freq: number = midiNumberToFrequency(note);
            return [freq / detuneCoeff, freq, freq * detuneCoeff];
        }
    }

}
