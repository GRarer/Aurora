import Tile from "../Tile.js";
import TileProject from "../../tileProjects/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import Game from "../../Game.js";
import Cost from "../../resources/Cost.js";
import Resource from "../../resources/Resource.js";
import { Random } from "../../util/Random.js";
import { WastelandTexture1, WastelandTexture2, WastelandTexture3, WastelandTexture4, WastelandTexture5 } from "../../UI/Images.js";
import Road from "./Road.js";
import ConstructionHabitat from "./ConstructionHabitat.js";
import ConstructionLaboratory from "./ConstructionLaboratory.js";
import ConstructionIndustry from "./ConstructionIndustry.js";
import { adjacentToRoad } from "../../predicates/TilePredicates.js";
import World from "../World.js";



export default class Wasteland extends Tile {

    protected texture: HTMLImageElement = Random.fromWeightedArray([
        [1 / 8, WastelandTexture1],
        [1 / 8, WastelandTexture2],
        [1 / 8, WastelandTexture3],
        [1 / 8, WastelandTexture4],
        [4 / 8, WastelandTexture5],
    ]);

    constructor(position: GridCoordinates) {
        super(position);
    }

    possibleProjects: TileProject[] = [

        new TileProject("Create habitat construction site", "Designate this location for construction of habitation and life support facilities",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new ConstructionHabitat(position));
            }, [], [], [],
        ),

        new TileProject("Create laboratory construction site", "Designate this location for construction of research laboratories",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new ConstructionLaboratory(position));
            }, [], [], [],
        ),

        new TileProject("Create industry construction site", "Designate this location for construction of industrial facilities and infrastructure",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new ConstructionIndustry(position));
            }, [], [], [],
        ),

        new TileProject("Construct Road", "Construct roads to extend the reach of the colony's logistics",
            (position: GridCoordinates, run: Game) => {
                run.world.placeTile(new Road(position));
            },
            [new Cost(Resource.BuildingMaterials, 10)],
            [adjacentToRoad],
            [],
        ),
    ];

    static readonly tileName: string = "Wasteland";
    static readonly tileDescription: string = "Nothing of note here";
    getTileName(): string {
        return Wasteland.tileName;
    }
    getTileDescription(): string {
        return Wasteland.tileDescription;
    }

    // we overload this to avoid having different wasteland textures in the same place in the same run
    getTexture(world: World): HTMLImageElement {
        const history = world.getPastTexture(Wasteland, this.position);
        if (history) {
            return history;
        } else {
            world.storePastTexture(Wasteland, this.position, this.texture);
            return this.texture;
        }
    }
}
