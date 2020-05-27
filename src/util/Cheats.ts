import Resource from "../resources/Resource.js";
import Game from "../Game.js";
import Species from "../resources/Species.js";
import { GameWindow } from "../ui/GameWindow.js";
import Cost from "../resources/Cost.js";
import { HumanEnding, AlienEnding } from "../quests/Quests.js";
import EndScreen from "../ui/menu/EndScreen.js";
import TransitionScreen from "../ui/transitionScreen/TransitionScreen.js";
import { Achievements } from "../achievements/Achievements.js";

// cheat methods for debugging/testing via the browser console
export namespace Cheats {

    let currentGame: Game | undefined = undefined;

    // call this to update game and ui after each cheat's effect
    function refresh(): void {
        currentGame!.updateQuestState();
        GameWindow.refreshCurrentPage();
    }

    function addResource(resource: Resource, quantity: number): void {
        currentGame!.inventory.addResource(resource, quantity);
        refresh();
    }

    function removeResource(resource: Resource, quantity: number): void {
        currentGame!.inventory.payCost([new Cost(resource, quantity)]);
        refresh();
    }

    function addPopulation(species: Species, quantity: number): void {
        currentGame!.inventory.addWorkers(species, quantity);
        refresh();
    }

    function showEnding(human: boolean = false): void {
        GameWindow.show(new EndScreen(human ? HumanEnding : AlienEnding));
    }

    function freeResources(): void {
        for (const resource of Resource.values) {
            addResource(resource, 1000000);
        }
    }

    function showQuote(index: number): void {
        const transitionScreen = new TransitionScreen(currentGame!, index);
        GameWindow.show(transitionScreen);
        transitionScreen.startLoading();
    }

    // makes cheat methods available from the console and make them apply to the given game
    export function enableCheats(game: Game): void {
        currentGame = game;

        const theWindow: any = window;
        theWindow.cheatsAddResource = (resource: Resource, quantity: number) =>
            addResource(resource, quantity);
        theWindow.cheatsRemoveResource = (resource: Resource, quantity: number) =>
            removeResource(resource, quantity);
        theWindow.cheatsAddPopulation = (species: Species, quantity: number) =>
            addPopulation(species, quantity);
        theWindow.cheatsFreeResources = () => freeResources();
        theWindow.cheatsShowEnding = (human: boolean = false) => showEnding(human);
        theWindow.showQuote = (index: number) => showQuote(index);
        theWindow.unlockAllAchievements = () => Achievements.unlockAll();

        /* these classes also need to be made globally accessible so their instances can be used as parameters of cheats
        * we freeze the constructors so the existing instances can't be modified
        * unfortunately, this still makes it possible for players to construct new instances of the multitons that are
        * supposed to be constant
        */
        Object.freeze(Resource);
        Object.freeze(Species);
        theWindow.Resources = Resource;
        theWindow.Species = Species;
    }
}
