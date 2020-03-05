import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { XenoLabTexture } from "../../UI/Images.js";


export default class XenoLab extends Tile {
    protected texture: HTMLImageElement = XenoLabTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    resourceConversions = [
        new Conversion(
            [],
            [new Cost(Resource.AlienKnowledge, 10)],
            50,
        ),
    ];

    static readonly tileName: string = "Xenoarchaeology Lab";
    static readonly tileDescription: string = "A laboratory for studying artifacts and technology left by the now-dead alien civilization";
    getTileName(): string {
        return XenoLab.tileName;
    }
    getTileDescription(): string {
        return XenoLab.tileDescription;
    }
}
