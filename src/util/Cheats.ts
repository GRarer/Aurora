import Resource from "../resources/Resource.js";
import Game from "../Game.js";
import Species from "../resources/Species.js";
import { GameWindow } from "../UI/GameWindow.js";
import Cost from "../resources/Cost.js";
import { HumanEnding, AlienEnding } from "../quests/Quests.js";
import EndScreen from "../UI/endScreen/EndScreen.js";
import TransitionScreen from "../UI/transitionScreen/TransitionScreen.js";
import { Achievements } from "../achievements/Achievements.js";

// container for cheat methods for debugging/testing via the browser console
class Cheats {
    constructor(
        private currentGame: Game,
    ) { }

    // call this to update game and ui after each cheat's effect
    refresh(): void {
        this.currentGame.updateQuestState();
        GameWindow.refreshCurrentPage();
    }

    addResource(resource: Resource, quantity: number): void {
        this.currentGame.inventory.addResource(resource, quantity);
        this.refresh();
    }

    removeResource(resource: Resource, quantity: number): void {
        this.currentGame.inventory.payCost([new Cost(resource, quantity)]);
        this.refresh();
    }

    addPopulation(species: Species, quantity: number): void {
        this.currentGame.inventory.addWorkers(species, quantity);
        this.refresh();
    }

    showEnding(human: boolean = false): void {
        GameWindow.show(new EndScreen(human ? HumanEnding : AlienEnding));
    }

    freeResources(): void {
        for (const resource of Resource.values()) {
            this.addResource(resource, 1000000);
        }
    }

    showQuote(index: number): void {
        GameWindow.show(new TransitionScreen(this.currentGame, index));
    }
}

// makes cheat methods available from the console
export function enableCheats(run: Game): void {

    const cheatsObject = new Cheats(run);
    const theWindow: any = window;
    theWindow.cheatsAddResource = (resource: Resource, quantity: number) => cheatsObject.addResource(resource, quantity);
    theWindow.cheatsRemoveResource = (resource: Resource, quantity: number) => cheatsObject.removeResource(resource, quantity);
    theWindow.cheatsAddPopulation = (species: Species, quantity: number) => cheatsObject.addPopulation(species, quantity);
    theWindow.cheatsFreeResources = () => cheatsObject.freeResources();
    theWindow.cheatsShowEnding = (human: boolean = false) => cheatsObject.showEnding(human);
    theWindow.showQuote = (index: number) => cheatsObject.showQuote(index);
    theWindow.unlockAllAchievements = () => Achievements.unlockAll();

    // these classes also need to be made globally accessible so their instances can be used as parameters for cheats
    // we freeze the constructors so the existing instances can't be modified
    // unfortunately, this still makes it possible for players to construct new instances of the multitons that are supposed to be constant
    Object.freeze(Resource);
    Object.freeze(Species);
    theWindow.Resources = Resource;
    theWindow.Species = Species;
}
