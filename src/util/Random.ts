import { NonEmptyArray } from "./Arrays.js";

/* random number generation helper methods
 * adapted from Prototype Inheritance by May Lawver
 */
export namespace Random {

    // random real number (almost always non-integer) within the given range
    export function realBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    // random integer within the given range
    export function intBetween(min: number, max: number): number {
        return Math.floor(realBetween(min, max));
    }

    // randomly selected element from an array
    export function fromArray<T>(arr: NonEmptyArray<T>): T {
        return arr[intBetween(0, arr.length)];
    }

    // return true with a chance probability and false with a (1 - chance) probability
    export function bool(chance: number = 0.5): boolean {
        return Math.random() < chance;
    }

    // Randomly select an element from an array, with selection biased based on
    // a weight for each element.
    export function fromWeightedArray<T>(weightedElems: NonEmptyArray<[number, T]>): T {
        const totalWeight = weightedElems.map(e => e[0]).reduce((x, y) => x + y, 0);
        let n = Math.random() * totalWeight;
        for (const [weight, x] of weightedElems) {
            if (n < weight) {
                return x;
            } else {
                n -= weight;
            }
        }
        // Default to the last element in the rare case that something went
        // wrong with floating point
        return weightedElems[weightedElems.length - 1][1];
    }
}
