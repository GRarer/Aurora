import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Conversion from "../../resources/Conversion.js";
import Resource from "../../resources/Resource.js";
import Cost from "../../resources/Cost.js";
import Species from "../../resources/Species.js";
import { GreenhouseTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class Greenhouse extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return GreenhouseTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [new Cost(Resource.Energy, 10)], [new Cost(Resource.Food, 200)], 30
        ),
    ];

    static readonly tileName: string = "Greenhouse";
    static readonly tileDescription: string = `Produces ${Resource.Food.name} for ${Species.Human.name}`;
    getTileName(): string {
        return Greenhouse.tileName;
    }
    getTileDescription(): string {
        return Greenhouse.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new Greenhouse(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

