import Tile from "../Tile.js";
import GridCoordinates from "../GridCoordinates.js";
import Resource from "../../resources/Resource.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import { MineshaftTexture } from "../../UI/Images.js";

export default class Mineshaft extends Tile {
    protected texture: HTMLImageElement = MineshaftTexture;

    constructor(position: GridCoordinates) {
        super(position);
    }

    resourceConversions = [
        new Conversion(
            [],
            [new Cost(Resource.Metal, 50)],
            80,
        ),
    ];

    static readonly tileName: string = "Mineshaft";
    static readonly tileDescription: string = "A mineshaft built into a mountain to allow long-term ore extraction";
    getTileName(): string {
        return Mineshaft.tileName;
    }
    getTileDescription(): string {
        return Mineshaft.tileDescription;
    }
}
