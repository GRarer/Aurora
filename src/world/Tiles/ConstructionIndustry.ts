import Tile from "../Tile.js";
import TileProject from "../../tileProjects/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import { IndustryConstructionTexture } from "../../UI/Images.js";
import Game from "../../Game.js";
import Resource from "../../resources/Resource.js";
import Cost from "../../resources/Cost.js";
import { TileWithinDistancePredicate, adjacentToRoad } from "../../predicates/TilePredicates.js";
import MiningFacility from "./MiningFacility.js";
import Mountain from "./Mountain.js";
import SolarPanels from "./SolarArray.js";
import NuclearPlant from "./NuclearPlant.js";
import Wasteland from "./Wasteland.js";
import { StructureConstructionTech, NuclearTech, IndustrialEngineeringTech, RobotTech } from "../../techtree/TechTree.js";
import { TechPredicate } from "../../predicates/WorldPredicates.js";
import RobotHive from "./RobotHive.js";
import { constructionProject } from "../../tileProjects/TileProject.js";

export default class ConstructionIndustry extends Tile {

    protected texture: HTMLImageElement = IndustryConstructionTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }



    possibleProjects: TileProject[] = [
        new TileProject("Break down construction site", "Revert this location to wasteland",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new Wasteland(position));
            }, [], [], [],
        ),

        constructionProject(RobotHive,
            [new Cost(Resource.BuildingMaterials, 250), new Cost(Resource.Electronics, 500)],
            [
                new TechPredicate(StructureConstructionTech),
                new TechPredicate(RobotTech),
                adjacentToRoad,
            ],
            [new TechPredicate(IndustrialEngineeringTech)],
        ),

        constructionProject(SolarPanels,
            [new Cost(Resource.Electronics, 200)],
            [],
            [],
        ),

        constructionProject(MiningFacility,
            [new Cost(Resource.Energy, 200), new Cost(Resource.Metal, 300)],
            [new TileWithinDistancePredicate(5, Mountain), adjacentToRoad],
            [],
        ),

        constructionProject(NuclearPlant,
            [new Cost(Resource.BuildingMaterials, 100), new Cost(Resource.Electronics, 100)],
            [new TechPredicate(NuclearTech), adjacentToRoad],
            [new TechPredicate(StructureConstructionTech)],
        ),
    ];

    static readonly tileName: string = "Construction Site - Industry";
    static readonly tileDescription: string = "An area designated for construction of industrial facilities and infrastructure";
    getTileName(): string {
        return ConstructionIndustry.tileName;
    }
    getTileDescription(): string {
        return ConstructionIndustry.tileDescription;
    }
}
