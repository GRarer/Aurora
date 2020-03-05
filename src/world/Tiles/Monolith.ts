import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import { MonolithTexture } from "../../UI/Images.js";

export default class Monolith extends Tile {
    protected texture: HTMLImageElement = MonolithTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }


    static readonly tileName: string = "Monolith";
    static readonly tileDescription: string = "A towering alien structure of unknown purpose";
    getTileName(): string {
        return Monolith.tileName;
    }
    getTileDescription(): string {
        return Monolith.tileDescription;
    }
}
