import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Species from "../../resources/Species.js";
import Housing from "../../resources/Housing.js";
import { ArcologyTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";
import { safetyProject } from "../../quests/SafetyProject.js";

@TileType
export default class Arcology extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return ArcologyTexture;
    }

    populationCapacity: Housing = new Housing(Species.Human, 2000);

    possibleProjects = [
        safetyProject
    ];

    static readonly tileName: string = "Arcology";
    static readonly tileDescription: string =
        "A self-contained habitat for efficiently housing a large number of humans";

    getTileName(): string {
        return Arcology.tileName;
    }
    getTileDescription(): string {
        return Arcology.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        populationCapacity: Housing.schema,
    }, ({ position, populationCapacity }) => {
        const r = new Arcology(position);
        r.populationCapacity = populationCapacity;
        return r;
    });
}

