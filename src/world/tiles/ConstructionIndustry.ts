import Tile, { TileType, wastelandVariantSchema } from "../Tile.js";
import TileProject from "../../world/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import { IndustryConstructionTexture, } from "../../ui/Images.js";
import Game from "../../Game.js";
import Resource from "../../resources/Resource.js";
import Cost from "../../resources/Cost.js";
import MiningFacility from "./MiningFacility.js";
import SolarPanels from "./SolarArray.js";
import NuclearPlant from "./NuclearPlant.js";
import Wasteland from "./Wasteland.js";
import { constructionProject } from "../../world/TileProject.js";
import ConstructionFactory from "./ConstructionFactory.js";
import ElectronicsFactory from "./ElectronicsFactory.js";
import XenoFactory from "./XenoFactory.js";
import ZeroPointPlant from "./ZeroPointPlant.js";
import { techRequirement, roadRequirement } from "../../queries/DescribedTileQuery.js";
import { hasTech } from "../../queries/Queries.js";
import { Schemas as S } from "@nprindle/augustus";
import Technology from "../../techtree/Technology.js";

@TileType
export default class ConstructionIndustry extends Tile {

    constructor(position: GridCoordinates, private wastelandVariant?: 1 | 2 | 3 | 4 | 5) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return IndustryConstructionTexture;
    }

    possibleProjects: TileProject[] = [
        new TileProject("Break down construction site", "Revert this location to wasteland",
            (position: GridCoordinates, game: Game) => {
                game.world.placeTile(new Wasteland(position, this.wastelandVariant));
            }, [], [], [],
        ),

        constructionProject(SolarPanels,
            [new Cost(Resource.Electronics, 200)],
            [],
            [],
        ),

        constructionProject(MiningFacility,
            [new Cost(Resource.Energy, 100), new Cost(Resource.BuildingMaterials, 100)],
            [roadRequirement, techRequirement(Technology.IndustrialEngineering)],
            [hasTech(Technology.StructuralEngineering)],
        ),

        constructionProject(ConstructionFactory,
            [new Cost(Resource.BuildingMaterials, 350)],
            [roadRequirement, techRequirement(Technology.IndustrialEngineering)],
            [hasTech(Technology.StructuralEngineering)],
        ),

        constructionProject(ElectronicsFactory,
            [new Cost(Resource.BuildingMaterials, 300), new Cost(Resource.Electronics, 150)],
            [roadRequirement, techRequirement(Technology.IndustrialEngineering)],
            [hasTech(Technology.StructuralEngineering)],
        ),

        constructionProject(XenoFactory,
            [
                new Cost(Resource.BuildingMaterials, 200),
                new Cost(Resource.Electronics, 200),
                new Cost(Resource.Energy, 1000)
            ],
            [roadRequirement, techRequirement(Technology.XenoMaterials)],
            [hasTech(Technology.Xenoarchaeology)],
        ),

        constructionProject(NuclearPlant,
            [new Cost(Resource.BuildingMaterials, 150), new Cost(Resource.Electronics, 300)],
            [techRequirement(Technology.NuclearEngineering), roadRequirement],
            [hasTech(Technology.StructuralEngineering)],
        ),

        constructionProject(ZeroPointPlant,
            [
                new Cost(Resource.BuildingMaterials, 200),
                new Cost(Resource.Electronics, 100),
                new Cost(Resource.Superconductor, 1000)
            ],
            [techRequirement(Technology.ZeroPointEnergy)],
            [hasTech(Technology.Xenoarchaeology)],
        ),
    ];

    static readonly tileName: string = "Construction Site - Industry";
    static readonly tileDescription: string =
        "An area designated for construction of industrial facilities and infrastructure";

    getTileName(): string {
        return ConstructionIndustry.tileName;
    }
    getTileDescription(): string {
        return ConstructionIndustry.tileDescription;
    }

    static readonly schema = S.contra(
        S.recordOf({
            position: GridCoordinates.schema,
            wastelandVariant: wastelandVariantSchema,
        }),
        (x: ConstructionIndustry) => ({ position: x.position, wastelandVariant: x.wastelandVariant }),
        ({ position, wastelandVariant }) => new ConstructionIndustry(position, wastelandVariant),
    );
}

