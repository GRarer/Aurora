import Tile from "../Tile.js";
import TileProject from "../../tileProjects/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import Game from "../../Game.js";
import Resource from "../../resources/Resource.js";
import Wasteland from "./Wasteland.js";
import Cost from "../../resources/Cost.js";
import { MountainTexture } from "../../UI/Images.js";
import Mineshaft from "./Mineshaft.js";
import { StructureConstructionTech } from "../../techtree/TechTree.js";
import { techRequirement, tileWithinDistanceRequirement, roadRequirement } from "../../predicates/DescribedTilePredicate.js";
import MiningFacility from "./MiningFacility.js";

export default class Mountain extends Tile {
    protected texture: HTMLImageElement = MountainTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    possibleProjects: TileProject[] = [
        new TileProject("Construct Mineshaft", "Create a mineshaft to allow long-term ore extraction",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new Mineshaft(position));
            },
            [new Cost(Resource.Energy, 100), new Cost(Resource.BuildingMaterials, 25)],
            [techRequirement(StructureConstructionTech), roadRequirement],
            [],
        ),

        new TileProject("Strip Mining", `Destroy the mountain to produce ${Resource.Metal.name}`,
            (position: GridCoordinates, run: Game) => {
                run.inventory.addResource(Resource.Metal, 500);
                run.world.placeTile(new Wasteland(position));
            },
            [new Cost(Resource.Energy, 25)],
            [tileWithinDistanceRequirement(MiningFacility, 5)],
            [],
        ),
    ];

    static readonly tileName: string = "Mountain";
    static readonly tileDescription: string = "A large geological formation containing useful mineral resources";
    getTileName(): string {
        return Mountain.tileName;
    }
    getTileDescription(): string {
        return Mountain.tileDescription;
    }
}
