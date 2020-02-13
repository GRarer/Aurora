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
    static readonly tileDescription: string = "Converts light from this system's sun into electical energy. Useful for basic colony and research functions.";
    getTileName(): string {
        return SolarPanels.tileName;
    }
    getTileDescription(): string {
        return SolarPanels.tileDescription;
    }
}
