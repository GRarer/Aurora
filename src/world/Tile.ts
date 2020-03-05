import GridCoordinates from "./GridCoordinates.js";
import TileProject from "../tileProjects/TileProject.js";
import Conversion from "../resources/Conversion.js";
import Housing from "../resources/Housing.js";
import World from "./World.js";

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

    readonly populationCapacity: Housing | undefined = undefined;

    // this provides a key into the ImageCache, which preloads all of the images so that we can synchronously draw them to the map canvas
    protected abstract readonly texture: HTMLImageElement;

    constructor(
        public position: GridCoordinates
    ) {}

    abstract getTileName(): string; // returns the name of the tile type
    abstract getTileDescription(): string; // return the tile type's description

    // by default this just returns the tile's texture, but it can be overridden to allow the texture to be changed
    // including changing the texture based on the position of other tiles in the world (e.g. for aligning roads)
    getTexture(world: World): HTMLImageElement {
        return this.texture;
    }

}

/* used by predicates to allow statically accessing the name of a Tile subclass
  * Tile subclasses that are used by predicates in this way
  * will need to declare a static readonly tileName string
  */
export type NamedTileType = typeof Tile & {
    readonly tileName: string;
    readonly tileDescription: string;
};
