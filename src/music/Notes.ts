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

}
