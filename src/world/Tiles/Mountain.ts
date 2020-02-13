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
    static readonly tileDescription: string = "A large geological formation containing useful mineral resources.";
    getTileName(): string {
        return Mountain.tileName;
    }
    getTileDescription(): string {
        return Mountain.tileDescription;
    }
}
