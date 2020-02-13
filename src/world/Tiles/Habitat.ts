import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Species from "../../resources/Species.js";
import Housing from "../../resources/Housing.js";
import { HabitatTexture } from "../../UI/Images.js";

export default class Habitat extends Tile {

    texture: HTMLImageElement = HabitatTexture;

    populationCapacity: Housing = new Housing(Species.Human, 200);

    constructor(position: GridCoordinates) {
        super(position);
    }

    static readonly tileName: string = "Habitat Dome";
    static readonly tileDescription: string = "A human habitat where the human population can live when they're not pursuing mission goals.";
    getTileName(): string {
        return Habitat.tileName;
    }
    getTileDescription(): string {
        return Habitat.tileDescription;
    }
}
