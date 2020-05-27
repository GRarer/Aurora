import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { NuclearPlantTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class NuclearPlant extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return NuclearPlantTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [],
            [new Cost(Resource.Energy, 1000)],
            15,
        ),
    ];

    static readonly tileName: string = "Nuclear Power Plant";
    static readonly tileDescription: string = "A high-efficiency fission power plant";
    getTileName(): string {
        return NuclearPlant.tileName;
    }
    getTileDescription(): string {
        return NuclearPlant.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new NuclearPlant(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

