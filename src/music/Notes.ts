import { mod } from "../util/Util.js";

export interface Note {

    midiNumber: number; // the MIDI number of the note
    start: number; // starting time in seconds
    duration: number; // duration in seconds
    endNote?: number; // MIDI number of note to end on. if undefined, this has no effect

}

export namespace Notes {

    export const noteNames: string[] = [
        "C", "C#", "D", "D#", "E", "F",
        "F#", "G", "G#", "A", "A#", "B"
    ];

    export function midiNumberToFrequency(midiNumber: number): number {
        return Math.pow(2, (midiNumber - 69) / 12) * 440;
    }

    export function midiNumberToNoteName(midiNumber: number): string {
        return `${noteNames[mod(midiNumber, 12)]}${Math.floor(midiNumber / 12) - 1}`;
    }

    // Pitchshift the given note up and down using the coefficient.
    // If the coefficient is 1, it returns the frequency of the initial note.
    // Otherwise, it returns [frequency / coefficient, frequency, frequency * coefficient].
    // Since frequency perception is logarithmic, this shifts the frequency up and down by the same amount.
    export function detuneWithCoeff(midiNumber: number, detuneCoeff: number): number[] {
        if (detuneCoeff === 1) {
            return [midiNumberToFrequency(midiNumber)];
        } else {
            const freq: number = midiNumberToFrequency(midiNumber);
            return [freq / detuneCoeff, freq, freq * detuneCoeff];
        }
    }

}
