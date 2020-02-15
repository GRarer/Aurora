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
    getTileName(): string {
        return Habitat.tileName;
    }

    static readonly tileDescription: string = "Humans unfortunately need a physical space to live, breath, and make my not-life more difficult. This is where they do that."
    getTileDescription(): string {
        return Habitat.tileDescription;
    }
}
