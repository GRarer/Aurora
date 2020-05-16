import Tile, { TileType } from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { ConstructionFactoryTexture } from "../../ui/Images.js";
import { Schemas as S } from "@nprindle/augustus";

@TileType
export default class ConstructionFactory extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getTexture(): HTMLImageElement {
        return ConstructionFactoryTexture;
    }

    resourceConversions = [
        Conversion.newConversion(
            [new Cost(Resource.Metal, 1000)],
            [new Cost(Resource.BuildingMaterials, 1000)],
            250,
        ),
    ];

    static readonly tileName: string = "Construction Materials Factory";
    static readonly tileDescription: string = `A facility for producing ${Resource.BuildingMaterials.name}`;
    getTileName(): string {
        return ConstructionFactory.tileName;
    }
    getTileDescription(): string {
        return ConstructionFactory.tileDescription;
    }

    static readonly schema = S.classOf({
        position: GridCoordinates.schema,
        resourceConversions: S.arrayOf(Conversion.schema),
    }, ({ position, resourceConversions }) => {
        const s = new ConstructionFactory(position);
        s.resourceConversions = resourceConversions;
        return s;
    });
}

