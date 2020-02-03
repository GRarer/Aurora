import Resource from "../resources/Resource.js";
import Game from "../Game.js";
import WorldScreen from "../UI/worldScreen/WorldScreen.js";
import Species from "../resources/Species.js";

// container for cheat methods for debugging/testing via the browser console
class Cheats {
    constructor(
        private currentGame: Game,
        private worldScreen: WorldScreen // we need this to trigger UI updates when cheats change things
    ){}

    // call this to update game and ui after each cheat's effect
    refresh() {
        this.currentGame.updateQuestState();
        this.worldScreen.refreshComponents();
    }

    addResource(resource: Resource, quantity: number) {
        this.currentGame.inventory.addResource(resource, quantity);
        this.refresh();
    }

    addPopulation(species: Species, quantity: number) {
        this.currentGame.inventory.addWorkers(species, quantity);
        this.refresh();
    }
}

// makes cheat methods available from the console (should be enabled whenever on the world screen)
export function enableCheats(run: Game, worldScreen: WorldScreen) {

    const cheatsObject = new Cheats(run, worldScreen);
    const theWindow: any = window;
    theWindow.cheatsAddResource = (resource: Resource, quantity: number) => cheatsObject.addResource(resource, quantity);
    theWindow.cheatsAddPopulation = (species: Species, quantity: number) => cheatsObject.addPopulation(species, quantity);

    // these classes also need to be made globally accessible so their instances can be used as parameters for cheats
    // we freeze the constructors so the existing instances can't be modified
    // unfortunately, this still makes it possible for players to construct new instances of the multitons that are supposed to be constant
    Object.freeze(Resource);
    Object.freeze(Species);
    theWindow.Resources = Resource;
    theWindow.Species = Species;
}

// removes cheats and associated attributes from global scope
export function disableCheats() {
    const theWindow: any = window;
    theWindow.cheatsAddResource = undefined;
    theWindow.cheatsAddPopulation = undefined;
    theWindow.Resources = undefined;
    theWindow.Species = undefined;
}
