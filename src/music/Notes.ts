export interface Note {

    note: number, //the MIDI number of the note
    start: number, //starting time in seconds
    duration: number, //duration in seconds
    endNote?: number, //MIDI number of note to end on. if undefined, this has no effect

}

export class Notes {

    static readonly noteNames: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F',
        'F#', 'G', 'G#', 'A', 'A#', 'B'];

    static midiNumberToFrequency(note: number): number {
        return Math.pow(2, (note - 69) / 12) * 440;
    }

    static midiNumberToNoteName(note: number): string {
        while (note < 0) {
            note += 12;
        }
        return this.noteNames[note % 12];
    }

    static detuneWithCoeff(note: number, detuneCoeff: number): number[] {
        if (detuneCoeff === 1) {
            return [this.midiNumberToFrequency(note)];
        } else {
            const freq: number = this.midiNumberToFrequency(note);
            return [freq / detuneCoeff, freq, freq * detuneCoeff];
        }
    }

}
