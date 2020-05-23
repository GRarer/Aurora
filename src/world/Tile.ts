import GridCoordinates from "./GridCoordinates.js";
import TileProject from "../world/TileProject.js";
import Conversion from "../resources/Conversion.js";
import Housing from "../resources/Housing.js";
import World from "./World.js";
import { Schema, Schemas as S } from "@nprindle/augustus";

/**
 * A tile is an object in the world that occupies a map square
 * they can be natural formations (wasteland, mountains, etc),
 * or artificial constructions (habitat, factory, highway, etc)
 */

export default abstract class Tile {

    // projects that can be completed on tiles of this type
    readonly possibleProjects: TileProject[] = [];

    // conversion from input resources to output resources that the tile can perform at the end of each turn
    resourceConversions: Conversion[] = [];

    readonly populationCapacity?: Housing = undefined;

    constructor(
        public position: GridCoordinates
    ) {}

    abstract getTileName(): string; // returns the name of the tile type
    abstract getTileDescription(): string; // return the tile type's description

    /* most tiles will always have the same texture, but for some tiles the texture can change depending on the world,
     * for example to allow adjacent road tiles to connect
     */
    abstract getTexture(world: World): HTMLImageElement;
}

/* used by predicates to allow statically accessing the name of a Tile subclass
 * Tile subclasses that are used by predicates in this way
 * will need to declare a static readonly tileName string
 */
export type NamedTileType = typeof Tile & {
    readonly tileName: string;
    readonly tileDescription: string;
};

/**
 * A global map of names of subtypes of Tile to their constructor
 */
const tileTypes: Record<string, typeof Tile & { schema: Schema<Tile, any>; }> = {};

/**
 * Decorator for registering Tile subclasses with 'tileTypes'
 */
export function TileType(target: typeof Tile & { schema: Schema<Tile, any>; }): void {
    tileTypes[target.name] = target;
}

export const typeofTileSchema: Schema<typeof Tile, keyof typeof tileTypes> = S.schema({
    encode: (x: typeof Tile): keyof typeof tileTypes => {
        return x.name;
    },
    decode: (x: keyof typeof tileTypes): typeof Tile => {
        return tileTypes[x];
    },
    validate: (x: unknown): x is keyof typeof tileTypes => {
        return S.aString.validate(x) && x in tileTypes;
    },
});

export const tileSchema: Schema<Tile, { type: string; value: any; }> = S.schema({
    encode: (x: Tile): { type: string; value: any; } => {
        const name: string = x.constructor.name;
        return {
            type: name,
            value: tileTypes[name].schema.encode(x),
        };
    }, decode: (x: { type: string; value: any; }): Tile => {
        const con = tileTypes[x.type];
        return con.schema.decode(x.value);
    }, validate: (data: unknown): data is { type: string; value: any; } => {
        if (S.recordOf({ type: S.aString, value: S.anAny }).validate(data)) {
            const tileType = tileTypes[data.type];
            if (tileType === undefined) {
                return false;
            }
            const schema = tileType.schema;
            return schema.validate(data.value);
        } else {
            return false;
        }
    }
});

/**
 * Serializer for the type of wasteland tile texture variants. The
 * implementation is slightly unsafe, but faster than the alternative union
 * of literals. This needs to be here, since many Tiles use it, and it would
 * throw a ReferenceError at runtime otherwise.
 */
export const wastelandVariantSchema: Schema<1 | 2 | 3 | 4 | 5, 1 | 2 | 3 | 4 | 5> =
    S.constrain(S.aNumber, x => 1 <= x && x <= 5) as Schema<1 | 2 | 3 | 4 | 5, 1 | 2 | 3 | 4 | 5>;

