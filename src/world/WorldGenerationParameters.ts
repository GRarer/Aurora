import GridCoordinates from "./GridCoordinates.js";
import Wasteland from "./Tiles/Wasteland.js";
import Mountain from "./Tiles/Mountain.js";
import Lander from "./Tiles/Lander.js";
import Monolith from "./Tiles/Monolith.js";
import Tile from "./Tile.js";

export namespace WorldGenerationParameters {

    // tiles which are always placed in the same location
    export const nonrandomTiles: Tile[] = [
        new Wasteland(new GridCoordinates(0, 0)),
        new Wasteland(new GridCoordinates(1, 0)),
        new Wasteland(new GridCoordinates(2, 0)),

        new Mountain(new GridCoordinates(0, 1)),
        new Mountain(new GridCoordinates(1, 1)),
        new Mountain(new GridCoordinates(2, 1)),

        new Wasteland(new GridCoordinates(0, 2)),
        new Wasteland(new GridCoordinates(1, 2)),
        new Wasteland(new GridCoordinates(2, 2)),

        new Wasteland(new GridCoordinates(0, 3)),
        new Lander(new GridCoordinates(1, 3)),
        new Wasteland(new GridCoordinates(2, 3)),

        new Wasteland(new GridCoordinates(0, 4)),
        new Wasteland(new GridCoordinates(1, 4)),
        new Wasteland(new GridCoordinates(2, 4)),


        new Monolith(new GridCoordinates(13, 15)),
    ];

    export const width: number = 20;
    export const height: number = 20;

    export const mountainRange: [number, number] = [20, 25];
    export const ruinRange: [number, number] = [5, 7];
}
