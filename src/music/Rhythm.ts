import { Random } from "../util/Random.js";

export default class Rhythm {

    subdivision: number[];
    _beats: number;

    constructor(beats: number = 8) {
        this.subdivision = [];
        this._beats = beats;
        this.generateSubdivision(beats);
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

    generateSubdivision(beats: number): void {
        this._beats = beats;
        this.subdivision = [];
        const divisions: number[] = [2, 3];
        const min: number = Math.min(...divisions);
        while (beats >= min) {
            const current: number = Random.fromArray(divisions.filter(num => num <= beats));
            beats -= current;
            this.subdivision.push(current);
        }
        if (beats > 0) {
            this.subdivision.push(beats);
        }
    }

}
