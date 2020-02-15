import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import Resource from "../../resources/Resource.js";
import { SolarPanelsTexture } from "../../UI/Images.js";

export default class SolarPanels extends Tile {
    texture: HTMLImageElement = SolarPanelsTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    resourceConversions = [
        new Conversion(
            [], [new Cost(Resource.Energy, 100)]
        ),
    ];

    static readonly tileName: string = "Photovoltaic Array";
    getTileName(): string {
        return SolarPanels.tileName;
    }

    static readonly tileDescription: string = "These plebians probably don't know the meaning of Photovoltaic Arrays. I'll make it simple. Panels use sun for power zap-zap."
    getTileDescription(): string {
        return SolarPanels.tileDescription;
    }
}
