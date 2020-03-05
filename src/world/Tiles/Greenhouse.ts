import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Conversion from "../../resources/Conversion.js";
import Resource from "../../resources/Resource.js";
import Cost from "../../resources/Cost.js";
import Species from "../../resources/Species.js";
import { GreenhouseTexture } from "../../UI/Images.js";

export default class Greenhouse extends Tile {
    protected texture: HTMLImageElement = GreenhouseTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    resourceConversions = [
        new Conversion(
            [new Cost(Resource.Energy, 10)], [new Cost(Resource.Food, 200)], 20
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
}
