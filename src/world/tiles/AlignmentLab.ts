import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { AlignmentLabTexture } from "../../ui/Images.js";
import { stripIndent } from "../../util/Text.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class AlignmentLab extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return AlignmentLabTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [],
            [new Cost(Resource.AlignmentKnowledge, 10)],
            100,
        ),
    ];

    static readonly tileName: string = "AI Alignment Lab";
    static readonly tileDescription: string = stripIndent`
        A research center for developing techniques that could allow humans to control an
        artificial intelligence or modify its goal programming`;
    getTileName(): string {
        return AlignmentLab.tileName;
    }
    getTileDescription(): string {
        return AlignmentLab.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new AlignmentLab(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

