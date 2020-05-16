import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import { NanotechFoundryTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class NanotechFoundry extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return NanotechFoundryTexture;
    }

    static readonly tileName: string = "Nanotech Foundry";
    static readonly tileDescription: string =
        `A nanotechnology manufacturing facility capable of completing the unfinished alien Monolith device`;
    getTileName(): string {
        return NanotechFoundry.tileName;
    }
    getTileDescription(): string {
        return NanotechFoundry.tileDescription;
    }

    static readonly schema = S.classOf(
        { position: GridCoordinates.schema },
        ({ position }) => new NanotechFoundry(position)
    );
}

