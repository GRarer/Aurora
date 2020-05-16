import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import { HumanCircuitsTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class HumanCircuits extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return HumanCircuitsTexture;
    }

    static readonly tileName: string = "Hypercomputer Network";
    static readonly tileDescription: string =
    `A self-replicating computing substrate hosting a utopian virtual reality for uploaded human minds`;

    getTileName(): string {
        return HumanCircuits.tileName;
    }

    getTileDescription(): string {
        return HumanCircuits.tileDescription;
    }

    static readonly schema = S.classOf(
        { position: GridCoordinates.schema },
        ({ position }) => new HumanCircuits(position)
    );
}

