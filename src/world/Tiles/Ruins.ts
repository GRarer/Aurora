import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import { RuinsTexture1, RuinsTexture2 } from "../../UI/Images.js";
import { Random } from "../../util/Random.js";

export default class Ruins extends Tile {
    protected texture: HTMLImageElement = Random.fromWeightedArray([
        [1 / 2, RuinsTexture1],
        [1 / 2, RuinsTexture2],
    ]);

    constructor(position: GridCoordinates) {
        super(position);
    }


    static readonly tileName: string = "Alien Ruins";
    static readonly tileDescription: string = "Abandoned structure built by a long-dead alien civilization";
    getTileName(): string {
        return Ruins.tileName;
    }
    getTileDescription(): string {
        return Ruins.tileDescription;
    }
}
