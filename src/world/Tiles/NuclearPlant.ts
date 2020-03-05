import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { NuclearPlantTexture } from "../../UI/Images.js";


export default class NuclearPlant extends Tile {
    protected texture: HTMLImageElement = NuclearPlantTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    resourceConversions = [
        new Conversion(
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
}
