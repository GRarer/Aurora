import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import { AlienCircuitsTexture } from "../../UI/Images.js";

export default class AlienCircuits extends Tile {
    protected texture: HTMLImageElement = AlienCircuitsTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    static readonly tileName: string = "Hypercomputer Network";
    static readonly tileDescription: string =
    `A self-replicating computing substrate that hosts a virtual reality for uploaded alien minds`;

    getTileName(): string {
        return AlienCircuits.tileName;
    }

    getTileDescription(): string {
        return AlienCircuits.tileDescription;
    }
}