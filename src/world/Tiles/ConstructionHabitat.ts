import Tile from "../Tile.js";
import TileProject from "../../tileProjects/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import { HabConstructionTexture } from "../../UI/Images.js";
import Game from "../../Game.js";
import Habitat from "./Habitat.js";
import Resource from "../../resources/Resource.js";
import Cost from "../../resources/Cost.js";
import { adjacentToRoad } from "../../predicates/TilePredicates.js";
import { TechPredicate } from "../../predicates/WorldPredicates.js";
import { StructureConstructionTech, UrbanPlanningTech } from "../../techtree/TechTree.js";
import Greenhouse from "./Greenhouse.js";
import Arcology from "./Arcology.js";
import Wasteland from "./Wasteland.js";

export default class ConstructionHabitat extends Tile {

    protected texture: HTMLImageElement = HabConstructionTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    possibleProjects: TileProject[] = [

        new TileProject("Break down construction site", "Revert this location to wasteland",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new Wasteland(position));
            }, [], [], [],
        ),

        new TileProject("Construct habitat dome", "Assemble a pressurized structure that provides housing, services, and life support for colonists",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new Habitat(position));
            },
            [new Cost(Resource.BuildingMaterials, 100)],
            [
                new TechPredicate(StructureConstructionTech),
                adjacentToRoad,
            ],
            [],
        ),

        new TileProject("Construct Arcology", "Construct a tower that can efficiently house a large number of humans",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new Arcology(position));
            },
            [new Cost(Resource.BuildingMaterials, 250)],
            [new TechPredicate(UrbanPlanningTech), adjacentToRoad],
            [new TechPredicate(StructureConstructionTech)],
        ),

        new TileProject("Construct Greenhouse", "Assemble a building where colonists can grow food and produce oxygen using genetically engineered plants",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new Greenhouse(position));
            },
            [new Cost(Resource.BuildingMaterials, 25)],
            [adjacentToRoad],
            [],
        ),
    ];

    static readonly tileName: string = "Construction Site - Habitat";
    static readonly tileDescription: string = "An area designated for construction of habitation and life support facilities";
    getTileName(): string {
        return ConstructionHabitat.tileName;
    }
    getTileDescription(): string {
        return ConstructionHabitat.tileDescription;
    }
}
