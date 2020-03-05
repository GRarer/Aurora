import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { EngineeringLabTexture } from "../../UI/Images.js";


export default class EngineeringLab extends Tile {
    protected texture: HTMLImageElement = EngineeringLabTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    resourceConversions = [
        new Conversion(
            [],
            [new Cost(Resource.EngineeringKnowledge, 5)],
            30,
        ),
    ];

    static readonly tileName: string = "Engineering Lab";
    static readonly tileDescription: string = "A workshop for developing new technology";
    getTileName(): string {
        return EngineeringLab.tileName;
    }
    getTileDescription(): string {
        return EngineeringLab.tileDescription;
    }
}
