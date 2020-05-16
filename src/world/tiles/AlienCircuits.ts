import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import { AlienCircuitsTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class AlienCircuits extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return AlienCircuitsTexture;
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

    static readonly schema =
        S.classOf({ position: GridCoordinates.schema }, ({ position }) => new AlienCircuits(position));
}

