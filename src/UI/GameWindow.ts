import MainMenuUI from "./menu/MainMenuUI.js";
import UI from "./UI.js";
import WorldScreen from "./worldScreen/WorldScreen.js";
import Game from "../Game.js";
import Cheats from "../util/Cheats.js";
import Resource from "../resources/Resource.js";
import TransitionScreen from "./transitionScreen/TransitionScreen.js";
import ProductionScreen from "./productionScreen/ProductionScreen.js";


export default class GameWindow {

    private static rootDiv: HTMLElement = document.getElementById('rootdiv')!; // find the div that holds all graphical UI (see index.html)
    private static currentRun: Game;

    public static showMainMenu() {
        this.disableCheats();
        UI.fillHTML(this.rootDiv, [MainMenuUI.renderMainMenu()]);
    }

    public static startGame() {
        this.currentRun = new Game();
        this.showWorldScreen();
    }

    public static showWorldScreen() {
        let worldScreen = new WorldScreen(this.currentRun);
        UI.fillHTML(this.rootDiv, [worldScreen.getHTML()]);

        this.enableCheats(worldScreen); // cheats are available when on the world screen
        
        // Attach keyboard input listener
        document.onkeydown = (e: KeyboardEvent) => {
            worldScreen.handleKeyDown(e);
        };  
    }

    public static showProductionScreen() {
        this.disableCheats();

        let productionScreen: ProductionScreen = new ProductionScreen(this.currentRun);
        UI.fillHTML(this.rootDiv, [productionScreen.getHTML()]);
    }

    public static transitionToNextTurn() {
        this.disableCheats();
        let transitionScreen = new TransitionScreen();
        UI.fillHTML(this.rootDiv, [transitionScreen.getHTML()]);
        
        this.currentRun.completeTurn(); // update game state

        transitionScreen.revealButton();
    }

    // makes a 'cheats' object available from the bowser console when on the world screen
    private static enableCheats(worldScreen: WorldScreen) {
        (window as any).cheats = new Cheats(this.currentRun, worldScreen);
        // the resource class also needs to be available globally so that resource types are selectable in cheats in the console
        (window as any).Resources = Resource;
    }

    // removes cheats and associated attributes from globbal scope
    private static disableCheats() {
        (window as any).cheats = undefined;
        (window as any).Resources = undefined;
    }
}