import Tile from "../Tile.js";
import TileProject from "../../tileProjects/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import Game from "../../Game.js";
import Resource from "../../resources/Resource.js";
import Wasteland from "./Wasteland.js";
import Cost from "../../resources/Cost.js";
import { MountainTexture } from "../../UI/Images.js";

export default class Mountain extends Tile {
    texture: HTMLImageElement = MountainTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    possibleProjects: TileProject[] = [
        new TileProject("Strip Mining",
            (position: GridCoordinates, run: Game) => {
                run.inventory.addResource(Resource.Metal, 150);
                run.world.placeTile(new Wasteland(position));
            },
            [new Cost(Resource.Energy, 25)],
            [],
            [],
        ),
    ];

    static readonly tileName: string = "Mountain";
    getTileName(): string {
        return Mountain.tileName;
    }

    static readonly tileDescription: string = "Different planet, same weird spikes sticking up out of the ground. Let's make quick work of them."
    getTileDescription(): string {
        return Mountain.tileDescription;
    }
}
