import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import { NeuralEmulatorTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";
import { stripIndent } from "../../util/Text.js";

@TileType
export default class NeuralEmulator extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return NeuralEmulatorTexture;
    }

    static readonly tileName: string = "Neural Emulation Platform";
    static readonly tileDescription: string =
    stripIndent`
        A machine capable of interfacing with the alien monolith's hypercomputers and accessing the stored
        alien connectomes`;

    getTileName(): string {
        return NeuralEmulator.tileName;
    }
    getTileDescription(): string {
        return NeuralEmulator.tileDescription;
    }

    static readonly schema = S.classOf(
        { position: GridCoordinates.schema },
        ({ position }) => new NeuralEmulator(position)
    );
}

