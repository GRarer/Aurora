import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Species from "../../resources/Species.js";
import Housing from "../../resources/Housing.js";
import { ArcologyTexture } from "../../UI/Images.js";

export default class Arcology extends Tile {

    protected texture: HTMLImageElement = ArcologyTexture;

    populationCapacity: Housing = new Housing(Species.Human, 2000);

    constructor(position: GridCoordinates) {
        super(position);
    }

    static readonly tileName: string = "Arcology";
    static readonly tileDescription: string = "A self-contained habitat for efficiently housing a large number of humans";
    getTileName(): string {
        return Arcology.tileName;
    }
    getTileDescription(): string {
        return Arcology.tileDescription;
    }
}
