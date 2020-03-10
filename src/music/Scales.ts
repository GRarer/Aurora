import { mod } from "../util/Util.js";
import { Arrays } from "../util/Arrays.js";

export type Scale = number; // scales are encoded with numbers in Ian Ring's format

export interface ScaleQuery {
    // allowed range for number of imperfections (inclusive)
    imperfections?: [number, number];
    // allowed range for number of hemitones (inclusive)
    hemitones?: [number, number];
    // chord that the scale must contain
    chord?: Scale;
    // allowed range for number of notes in the scale (inclusive)
    notes?: [number, number];
}

export namespace Scales {

    export function createScaleFromPitchClass(pitches: number[]): Scale {
        if (!pitches.includes(0)) {
            throw new Error("scales must have a root");
        }
        return pitches.map(pitch => 1 << mod(pitch, 12)) // mod by 12 to fit into octave
            .filter((val, i, arr) => arr.indexOf(val) === i) // remove duplicates
            .reduce((acc, curr) => acc | curr, 0); // combine into final bit vector
    }

    // turns a scale into the set of pitches from the root
    // i.e., the scale 2^7 + 2^6 + 2^5 + 2^0 becomes [0, 5, 6, 7]
    export function getPitchClass(scale: Scale): number[] {
        const r: number[] = [];
        for (let i = 0; scale !== 0; scale >>>= 1, i++) {
            if (scale & 1) {
                r.push(i);
            }
        }
        return r;
    }

    export function getNumberOfNotes(scale: Scale): number {
        return getPitchClass(scale).length;
    }

    // Rotate a scale left if amount is positive and right if amount is negative
    export function rotateScale(scale: Scale, amount: number = 1): Scale { // courtesy of nprindle
        amount = mod(amount, 12); // ensure we only rotate as much as we need to
        const value = scale << amount | scale >>> (12 - amount);
        return value & 0xFFF; // mask to make sure it's still a 12-bit vector
    }

    export function getModes(scale: Scale): Scale[] {
        const r: Scale[] = [];
        let curr: Scale = scale;
        do {
            if (curr & 1) { // only add proper scales - i.e., ones with roots
                r.push(curr);
            }
            curr = rotateScale(curr, 1); // advance to the next mode
        } while (curr !== scale); // once we return to the original scale we're done
        return r;
    }

    export function hasInterval(scale: Scale, semitones: number): boolean {
        semitones = mod(semitones, 12);
        return (scale & (1 << semitones)) !== 0; // if the semitones-th bit is set, the scale contains a given interval
    }

    // count the instances of a particular interval in a scale
    // useful for counting tritonia / hemitonia / etc.
    export function countInterval(scale: Scale, semitones: number): number {
        semitones = mod(semitones, 12);
        const count: number = getModes(scale) // starting from each note in the scale...
            .filter(mode => hasInterval(mode, semitones)).length; // count all the notes with a note N semitones above them
        if (semitones === 6) { // special case (tritones get counted twice since they're symmetrical)
            return count / 2;
        }
        return count;
    }

    // count how many notes in the scale lack a perfect fifth above them
    export function getImperfections(scale: Scale): number {
        return getModes(scale).filter(mode => !hasInterval(mode, 7)).length;
    }

    export function containsScale(parent: Scale, child: Scale): boolean {
        return (parent & child) === child;
    }

    export function containsChord(scale: Scale, chord: number[]): boolean {
        return containsScale(scale, createScaleFromPitchClass(chord));
    }

    const scales: Scale[] = Arrays.flatten([
        getModes(0xab5), // major
        getModes(0x9ab), // neapolitan minor
        getModes(0x557), // leading whole-tone inverse
        getModes(0x9ad), // harmonic minor
        getModes(0x9b5), // harmonic major
        getModes(0xaad), // melodic minor
        getModes(0xa6d), // Jeths' mode
        getModes(0x9b3), // double harmonic major
    ]);

    // TODO: this can be made more efficient by caching modes.
    // see if that's worthwhile.
    export function matchesQuery(scale: Scale, query: ScaleQuery): boolean {
        const outOfBounds = (val: number, range: [number, number]): boolean => (val < range[0] || val > range[1]);
        if (query.notes && outOfBounds(getNumberOfNotes(scale), query.notes)) {
            return false;
        }
        if (query.imperfections && outOfBounds(getImperfections(scale), query.imperfections)) {
            return false;
        }
        if (query.hemitones && outOfBounds(countInterval(scale, 1), query.hemitones)) {
            return false;
        }
        // Any scale will contain the scale 0. (This is similar to how the empty set is a subset of any set.)
        // In that case it's sensible / slightly more efficient to skip the check if query.chord is 0.
        if (query.chord !== undefined && query.chord !== 0 && !containsScale(scale, query.chord)) {
            return false;
        }
        return true;
    }

    export function getAllScalesMatchingQuery(query: ScaleQuery): Scale[] {
        return scales.filter(scale => matchesQuery(scale, query));
    }

    // index into a pitch class, shifting up/down through octaves (ie, -1 is the last element of the class, but an octave down)
    export function indexIntoPitchClass(pitches: number[], index: number): number {
        return pitches[mod(index, pitches.length)] + 12 * Math.floor(index / pitches.length);
    }

}
