import MainMenuUI from "./menu/MainMenuUI.js";
import UI from "./UI.js";
import WorldScreen from "./worldScreen/WorldScreen.js";
import Game from "../Game.js";
import { disableCheats, enableCheats } from "../util/Cheats.js";
import Resource from "../resources/Resource.js";
import TransitionScreen from "./transitionScreen/TransitionScreen.js";
import ProductionScreen from "./productionScreen/ProductionScreen.js";
import CreditsScreen from "./menu/CreditsScreen.js";
import WorldScreenHeader from "./worldScreen/WorldScreenHeader.js";
import Species from "../resources/Species.js";


export default class GameWindow {

    private static rootDiv: HTMLElement = document.getElementById('rootdiv')!; // root div for all of our HTML
    private static currentRun: Game;

    public static showMainMenu() {
        disableCheats();
        UI.fillHTML(this.rootDiv, [MainMenuUI.renderMainMenu()]);
    }

    public static showCredits() {
        disableCheats();
        UI.fillHTML(this.rootDiv, [CreditsScreen.render()]);
    }

    public static startGame() {
        this.currentRun = new Game();
        this.showWorldScreen();
    }

    public static showWorldScreen() {
        const worldScreen = new WorldScreen(this.currentRun);
        UI.fillHTML(this.rootDiv, [worldScreen.getHTML()]);

        enableCheats(this.currentRun, worldScreen); // cheats are available when on the world screen

        // Attach keyboard input listener
        document.onkeydown = (e: KeyboardEvent) => {
            worldScreen.handleKeyDown(e);
        };
        document.onkeyup = (e: KeyboardEvent) => {
            worldScreen.handleKeyUp(e);
        }
    }

    public static showProductionScreen() {
        disableCheats();

        const productionScreen: ProductionScreen = new ProductionScreen(this.currentRun);
        UI.fillHTML(this.rootDiv, [productionScreen.getHTML()]);
    }

    public static transitionToNextTurn() {
        disableCheats();
        const transitionScreen = new TransitionScreen();
        UI.fillHTML(this.rootDiv, [transitionScreen.getHTML()]);

        this.currentRun.completeTurn(); // update game state

        transitionScreen.revealButton();
    }
}
