import Tile from "../Tile.js";
import TileProject from "../../tileProjects/TileProject.js";
import GridCoordinates from "../GridCoordinates.js";
import Conversion from "../../resources/Conversion.js";
import Cost from "../../resources/Cost.js";
import Resource from "../../resources/Resource.js";

export default class Habitat extends Tile {

    constructor(position: GridCoordinates) {
        super(position);
    }

    getImgSrc(): string {
        return "assets/tiles/habitat.png";
    }

    static readonly tileName: string = "Habitat Dome"
    getTileName(): string {
        return Habitat.tileName;
    }
}
