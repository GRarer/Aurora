export enum ChordQualities {
    MAJOR = "major",
    MINOR = "minor",
    SUS2 = "sus2",
    SUS4 = "sus4",
    VIENNESE = "viennese",
    DIM = "dim",
    AUG = "aug",
    MAJOR7 = "major7",
    MINOR7 = "minor7",
    DOM7 = "dom7",
    M7B5 = "m7b5",
    DIM7 = "dim7",
    DOM7SUS4 = "dom7sus4",
    MAJOR6 = "major6",
    MINOR6 = "minor6"
}

//Chord intervals are in ascending order of semitones away from the root.
//For example: C major = [C + 0 semitones, C + 4 semitones, C + 7 semitones] = [C, E, G].
export const ChordIntervals: Record<ChordQualities, number[]> = {
    "major": [0, 4, 7],
    "minor": [0, 3, 7],
    "sus2": [0, 2, 7],
    "sus4": [0, 5, 7],
    "viennese": [0, 6, 7],
    "dim": [0, 3, 6],
    "aug": [0, 4, 8],
    "major7": [0, 4, 7, 11],
    "minor7": [0, 3, 7, 10],
    "dom7": [0, 4, 7, 10],
    "m7b5": [0, 3, 6, 10],
    "dim7": [0, 3, 6, 9],
    "dom7sus4": [0, 5, 7, 9],
    "major6": [0, 4, 7, 9],
    "minor6": [0, 3, 7, 8]
}

export class Chord {

    root: number;
    quality: ChordQualities;
    intervals: number[];

    constructor(root: number, quality: ChordQualities) {
        this.root = root;
        this.quality = quality;
        this.intervals = ChordIntervals[quality];
    }

    get notes(): number[] {
        return this.intervals.map(interval => interval + this.root);
    }

}
