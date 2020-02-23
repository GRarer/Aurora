import { mod } from "../util/Util.js";

import { Arrays } from "../util/Arrays.js";

export type Scale = number; // scales are encoded with numbers in Ian Ring's format

export namespace Scales {

    export function createScaleFromPitchClass(pitches: number[]): Scale {
        if (!pitches.includes(0)) {
            throw new Error("scales must have a root");
        }
        return pitches.map(pitch => 1 << mod(pitch, 12)) // mod by 12 to fit into octave
            .filter((val, i, arr) => arr.indexOf(val) === i) // remove duplicates
            .reduce((acc, curr) => acc | curr); // combine into final bit vector
    }

    // turns a scale into the set of pitches from the root
    // i.e., the scale 2^7 + 2^6 + 2^5 + 2^0 becomes [0, 5, 6, 7]
    export function getPitchClass(scale: Scale): number[] {
        const r: number[] = [];
        let i = 0;
        while (scale > 0) {
            if (scale & 1) {
                r.push(i);
            }
            scale = scale >> 1;
            i++;
        }
        return r;
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
        while (curr !== scale || r.length === 0) { // once we return to the original scale we're done
            if (curr & 1) { // only add proper scales - i.e., ones with roots
                r.push(curr);
            }
            curr = rotateScale(curr, 1); // advance to the next mode
        }
        return r;
    }

    export function hasInterval(scale: Scale, semitones: number): boolean {
        semitones = mod(semitones, 12);
        return (scale & (1 << semitones)) > 0; // if the semitones-th bit is set, the scale contains a given interval
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

    export function containsChord(scale: Scale, chord: number[]): boolean {
        const chordScale = createScaleFromPitchClass(chord);
        return (scale & chordScale) === chordScale;
    }

    let _scales: Scale[] = [];

    export function scales(): Scale[] {
        if (_scales.length === 0) {
            _scales = Arrays.flatten([
                getModes(2741), // major
                getModes(2475), // neapolitan minor
                getModes(1367), // leading whole-tone inverse
                getModes(2477), // harmonic minor
                getModes(2485), // harmonic major
                getModes(2733), // melodic minor
                getModes(2669), // Jeths' mode
            ]);
        }
        return _scales;
    }

}