import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Species from "../../resources/Species.js";
import Housing from "../../resources/Housing.js";
import { RobotHiveTexture } from "../../ui/Images.js";
import TileProject from "../../world/TileProject.js";
import Cost from "../../resources/Cost.js";
import Resource from "../../resources/Resource.js";
import Game from "../../Game.js";
import { availableHousingRequirement } from "../../queries/DescribedTileQuery.js";
import { hasTech } from "../../queries/Queries.js";
import { Schemas as S } from "@nprindle/augustus";
import Technology from "../../techtree/Technology.js";

@TileType
export default class RobotHive extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return RobotHiveTexture;
    }

    populationCapacity: Housing = new Housing(Species.Robot, 5000);

    possibleProjects: TileProject[] = [
        new TileProject("Construct robot group", "Create 100 robotic worker drones",
            (position: GridCoordinates, game: Game) => {
                game.inventory.addWorkers(Species.Robot, 100);
                game.inventory.releaseWorkers(100);
            },
            [new Cost(Resource.Electronics, 50), new Cost(Resource.Energy, 100)],
            [availableHousingRequirement(Species.Robot, 100)],
            []
        ),

        new TileProject("Construct robot swarm", "Create 1000 robotic worker drones",
            (position: GridCoordinates, game: Game) => {
                game.inventory.addWorkers(Species.Robot, 1000);
                game.inventory.releaseWorkers(1000);
            },
            [new Cost(Resource.Electronics, 250), new Cost(Resource.Energy, 1000)],
            [availableHousingRequirement(Species.Robot, 1000)],
            [hasTech(Technology.SwarmRobotics)]
        ),
    ];

    static readonly tileName: string = "Drone Hive";
    static readonly tileDescription: string =
        "A facility for manufacturing, storing, and maintaining mobile robotic worker drones";

    getTileName(): string {
        return RobotHive.tileName;
    }
    getTileDescription(): string {
        return RobotHive.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        populationCapacity: Housing.schema,
    }, ({ position, populationCapacity }) => {
        const r = new RobotHive(position);
        r.populationCapacity = populationCapacity;
        return r;
    });
}

