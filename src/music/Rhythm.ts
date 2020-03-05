import { Random } from "../util/Random.js";
import { NonEmptyArray } from "../util/Arrays.js";

export default class Rhythm {

    subdivision: number[];
    _beats: number;

    constructor(beats: number = 8) {
        this.subdivision = [];
        this._beats = beats;
        this.generateNewSubdivision(beats);
    }

    get beats(): number {
        return this._beats;
    }

    // combine subdivisions at random
    generateTies(): number[] {
        let i: number = 0;
        const r: number[] = [];
        while (i < this.subdivision.length) {
            if (i < this.subdivision.length - 1 && Random.bool(0.5)) {
                r.push(this.subdivision[i] + this.subdivision[i + 1]);
                i += 2;
            } else {
                r.push(this.subdivision[i]);
                i++;
            }
        }
        return r;
    }

    generateNewSubdivision(beats: number): void {
        this._beats = beats;
        this.subdivision = [];
        const divisions = [2, 3];
        const min: number = Math.min(...divisions);
        while (beats >= min) {
            // Beats must be larger than the minimum of divisions, so this cast
            // is safe
            const current: number = Random.fromArray(divisions.filter(num => num <= beats) as NonEmptyArray<number>);
            beats -= current;
            this.subdivision.push(current);
        }
        if (beats > 0) {
            this.subdivision.push(beats);
        }
    }

}
