import { Notes } from './Notes.js';
import { Random } from '../util/Random.js';

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
    DOM7SUS4 = "dom7sus4"
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
    "dom7sus4": [0, 5, 7, 9]
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

    toString(): string {
        return `${Notes.midiNumberToNoteName(this.root)} ${this.quality}`;
    }

}

export class ChordMotion {

    sourceChords: ChordQualities[];
    distances: number[];
    destinationChords: ChordQualities[];

    constructor(sources: ChordQualities[], distances: number[], dests: ChordQualities[]) {
        this.sourceChords = sources;
        this.distances = distances;
        this.destinationChords = dests;
    };

    canStartOn(chord: Chord): boolean {
        return this.sourceChords.indexOf(chord.quality) !== -1;
    }

    nextFrom(chord: Chord): Chord {
        return new Chord(chord.root + Random.fromArray(this.distances),
            Random.fromArray(this.destinationChords));
    }

}
