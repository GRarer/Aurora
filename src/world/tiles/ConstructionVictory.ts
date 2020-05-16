import Tile, { TileType, wastelandVariantSchema } from "../Tile.js";
import TileProject from "../../world/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import { XenoEngineeringConstructionTexture } from "../../ui/Images.js";
import Game from "../../Game.js";
import Resource from "../../resources/Resource.js";
import Cost from "../../resources/Cost.js";
import Wasteland from "./Wasteland.js";
import { constructionProject } from "../../world/TileProject.js";
import NanotechFoundry from "./NanotechFoundry.js";
import Monolith from "./Monolith.js";
import NeuralEmulator from "./NeuralEmulator.js";
import {
    roadRequirement, techRequirement, tileWithinDistanceRequirement, nearMonolithRequirement
} from "../../queries/DescribedTileQuery.js";
import { hasTech, tileExists, notQuery } from "../../queries/Queries.js";
import { Schemas as S } from "@nprindle/augustus";
import Technology from "../../techtree/Technology.js";

@TileType
export default class ConstructionVictory extends Tile {

    constructor(position: GridCoordinates, private wastelandVariant?: 1 | 2 | 3 | 4 | 5) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return XenoEngineeringConstructionTexture;
    }

    possibleProjects: TileProject[] = [
        new TileProject("Break down construction site", "Revert this location to wasteland",
            (position: GridCoordinates, game: Game) => {
                game.world.placeTile(new Wasteland(position, this.wastelandVariant));
            }, [], [], [],
        ),

        constructionProject(NanotechFoundry,
            [
                new Cost(Resource.SmartMatter, 1000),
                new Cost(Resource.BuildingMaterials, 500),
                new Cost(Resource.Electronics, 200)
            ],
            [
                roadRequirement,
                nearMonolithRequirement(3),
                techRequirement(Technology.Nanotechnology)
            ],
            [hasTech(Technology.MonolithSurvey), notQuery(tileExists(NanotechFoundry))],
        ),

        constructionProject(NeuralEmulator,
            [
                new Cost(Resource.BuildingMaterials, 300),
                new Cost(Resource.Electronics, 1000),
                new Cost(Resource.Superconductor, 1000),
                new Cost(Resource.SmartMatter, 500)
            ],
            [
                roadRequirement,
                tileWithinDistanceRequirement(Monolith, 2),
                techRequirement(Technology.NeuralUploading)
            ],
            [hasTech(Technology.MonolithSurvey), notQuery(tileExists(NeuralEmulator))],
        ),
    ];

    static readonly tileName: string = "Construction Site - Hyperengineering";
    static readonly tileDescription: string =
    "An area designated for construction of advanced technologies necessary for completing the mission";

    getTileName(): string {
        return ConstructionVictory.tileName;
    }
    getTileDescription(): string {
        return ConstructionVictory.tileDescription;
    }

    static readonly schema = S.contra(
        S.recordOf({
            position: GridCoordinates.schema,
            wastelandVariant: wastelandVariantSchema,
        }),
        (x: ConstructionVictory) => ({ position: x.position, wastelandVariant: x.wastelandVariant }),
        ({ position, wastelandVariant }) => new ConstructionVictory(position, wastelandVariant),
    );
}

