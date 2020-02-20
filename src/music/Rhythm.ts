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
