import Tile, { TileType } from "../Tile.js";
import TileProject from "../../world/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import Game from "../../Game.js";
import Resource from "../../resources/Resource.js";
import Wasteland from "./Wasteland.js";
import Cost from "../../resources/Cost.js";
import { MountainTexture } from "../../ui/Images.js";
import Mineshaft from "./Mineshaft.js";
import { techRequirement, tileWithinDistanceRequirement, roadRequirement } from "../../queries/DescribedTileQuery.js";
import MiningFacility from "./MiningFacility.js";
import { Schemas as S } from "@nprindle/augustus";
import Technology from "../../techtree/Technology.js";

@TileType
export default class Mountain extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return MountainTexture;
    }

    possibleProjects: TileProject[] = [
        new TileProject("Construct Mineshaft", "Create a mineshaft to allow long-term ore extraction",
            (position: GridCoordinates, game: Game) => {
                game.world.placeTile(new Mineshaft(position));
            },
            [new Cost(Resource.Energy, 500), new Cost(Resource.BuildingMaterials, 250)],
            [
                techRequirement(Technology.StructuralEngineering),
                roadRequirement,
                tileWithinDistanceRequirement(MiningFacility, 5)
            ],
            [],
        ),

        new TileProject("Strip Mining", `Destroy the mountain to produce ${Resource.Metal.name}`,
            (position: GridCoordinates, game: Game) => {
                game.inventory.addResource(Resource.Metal, 500);
                game.world.placeTile(new Wasteland(position, 5));
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

    static readonly schema = S.classOf({ position: GridCoordinates.schema }, ({ position }) => new Mountain(position));
}

