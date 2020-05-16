import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { XenoFactoryTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class XenoFactory extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return XenoFactoryTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [new Cost(Resource.Cavorite, 500), new Cost(Resource.Energy, 200)],
            [new Cost(Resource.Superconductor, 500)],
            100,
        ),
        Conversion.newConversion(
            [new Cost(Resource.Orichalcum, 500), new Cost(Resource.Energy, 200)],
            [new Cost(Resource.SmartMatter, 500)],
            100,
        )
    ];

    static readonly tileName: string = "Xeno-Materials Factory";
    static readonly tileDescription: string = "A facility for processing alien resources";
    getTileName(): string {
        return XenoFactory.tileName;
    }
    getTileDescription(): string {
        return XenoFactory.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new XenoFactory(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

