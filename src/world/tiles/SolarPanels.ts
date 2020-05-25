import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import Resource from "../../resources/Resource.js";
import { SolarPanelsTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class SolarPanels extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return SolarPanelsTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [], [new Cost(Resource.Energy, 100)]
        ),
    ];

    static readonly tileName: string = "Photovoltaic Array";
    static readonly tileDescription: string = "Converts light from this planet's sun into electrical energy";
    getTileName(): string {
        return SolarPanels.tileName;
    }
    getTileDescription(): string {
        return SolarPanels.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new SolarPanels(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

