import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { XenoLabTexture } from "../../ui/Images.js";
import TileProject from "../../world/TileProject.js";
import Game from "../../Game.js";
import Monolith from "./Monolith.js";
import { stripIndent } from "../../util/Text.js";
import { tileWithinDistanceRequirement } from "../../queries/DescribedTileQuery.js";
import { hasTech, notQuery } from "../../queries/Queries.js";
import { Schemas as S } from "@nprindle/augustus";
import Technology from "../../techtree/Technology.js";

@TileType
export default class XenoLab extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return XenoLabTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [],
            [new Cost(Resource.AlienKnowledge, 10)],
            50,
        ),
    ];

    possibleProjects: TileProject[] = [
        new TileProject(
            "Survey Alien Monolith",
            stripIndent`
                The monolith appears to be some sort of supercomputer that was left unfinished when the alien
                civilization collapsed. Some archaeological evidence suggests that the monolith's construction caused
                the war in which the aliens destroyed each other. Studying it in detail may reveal its true purpose.
                Completing this project provides the "${Technology.MonolithSurvey.name}" technology.`,
            (position: GridCoordinates, game: Game) => { game.unlockTechnology(Technology.MonolithSurvey); },
            [new Cost(Resource.AlienKnowledge, 50)],
            [tileWithinDistanceRequirement(Monolith, 5)],
            [hasTech(Technology.AlienHistory), notQuery(hasTech(Technology.MonolithSurvey))]
        )
    ];

    static readonly tileName: string = "Xenoarchaeology Lab";
    static readonly tileDescription: string =
        "A laboratory for studying artifacts and technology left by the now-dead alien civilization";

    getTileName(): string {
        return XenoLab.tileName;
    }
    getTileDescription(): string {
        return XenoLab.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new XenoLab(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

