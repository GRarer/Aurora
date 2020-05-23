// enforces compile-tile check that an array have at least one element
export type NonEmptyArray<T> = [T, ...T[]];

export namespace Arrays {
    // Type predicate to assert that a 'T[]' is a 'NonEmptyArray<T>'
    export function isNonEmpty<T>(arr: T[]): arr is NonEmptyArray<T> {
        return arr.length > 0;
    }

    // creates a list of the desired length, filling it with values produced by the given function
    export function generate<T>(length: number, func: (i: number) => T): T[] {
        const result: T[] = new Array(length);
        for (let i = 0; i < length; i++) {
            result[i] = func(i);
        }
        return result;
    }

    // create a 1-dimensional array containing all of the elements from a 2-dimensional array
    export function flatten<T>(arr: T[][]): T[] {
        return arr.reduce((acc, x) => acc.concat(x), []);
    }

    export function isRectangle<T>(matrix: T[][]): boolean {
        return matrix.every(row => row.length === matrix[0].length);
    }
}
