import Tile from "./Tile.js";
import { Arrays } from "../util/Arrays.js"
import Wasteland from "./Tiles/Wasteland.js";
import Mountain from "./Tiles/Mountain.js";
import Random from "../util/Random.js";
import GridCoordinates from "./GridCoordinates.js";
import WorldGenerationParameters from "./WorldGenerationParameters.js";
import Species from "../resources/Species.js";

export default class World {

    width: number;
    height: number;

    // world grid is indexed grid[row][column]
    grid: Tile[][];

    constructor(params: WorldGenerationParameters) {
        this.width = params.worldWidth;
        this.height = params.worldHeight;

        // generate empty map
        this.grid = new Array(this.height);
        for(let row = 0; row < this.height; row++) {
            this.grid[row] = new Array(this.width);
            for(let column = 0; column < this.width; column++) {
                this.grid[row][column] = new Wasteland(new GridCoordinates(column, row));
            }
        }

        // place random mountains
        const mountainNumber = Random.intBetween(params.minMountains, params.maxMountains);
        for(let i = 0; i < mountainNumber; i++) {
            const wastelandTiles = this.getTiles().filter((tile: Tile) => (tile instanceof Wasteland));
            const position = Random.fromArray(wastelandTiles).position;
            this.placeTile(new Mountain(position));
        }

        // place the tiles specified in the parameters
        for (const tile of params.nonrandomTiles) {
            this.placeTile(tile);
        }
    }

    // place a tile into the grid in the position given by the tile's coordinates
    placeTile(tile: Tile) {
        this.grid[tile.position.y][tile.position.x] = tile;
    }

    getTiles(): Tile[] {
        return Arrays.flatten(this.grid);
    }

    getTilesInRectangle(leftX: number, topY: number, width: number, height: number): Tile[] {
        if (topY < 0) {
            topY = 0;
        }
        if (leftX < 0) {
            leftX = 0;
        }

        const tiles: Tile[] = [];

        const rowsInRange = this.grid.slice(topY, topY + height);
        for (const row of rowsInRange) {
            const tilesInRange = row.slice(leftX, leftX + width);
            for (const tile of tilesInRange) {
                tiles.push(tile);
            }
        }

        return tiles;
    }

    getTileAtCoordinates(coordinates: GridCoordinates) {
        return this.grid[coordinates.y][coordinates.x];
    }

    getTilesInCircle(center: GridCoordinates, radius: number) {
        return this.getTiles().filter(tile => (center.distanceFrom(tile.position) <= radius));
    }

    getPopulationCapacity(species: Species): number {
        let capacity = 0;

        for (const tile of this.getTiles()) {
            if (tile.populationCapacity && tile.populationCapacity.species == species) {
                capacity = capacity + tile.populationCapacity.capacity;
            }
        }

        return capacity;
    }
}
