import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Conversion from "../../resources/Conversion.js";
import Resource from "../../resources/Resource.js";
import Cost from "../../resources/Cost.js";
import Species from "../../resources/Species.js";
import { HydroponicsTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class Hydroponics extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return HydroponicsTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [new Cost(Resource.Energy, 150)], [new Cost(Resource.Food, 2000)], 50
        ),
    ];

    static readonly tileName: string = "Hydroponics Greenhouse";
    static readonly tileDescription: string =
        `Produces ${Resource.Food.name} for ${Species.Human.name} more efficiently than a standard greenhouse`;
    getTileName(): string {
        return Hydroponics.tileName;
    }
    getTileDescription(): string {
        return Hydroponics.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new Hydroponics(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

