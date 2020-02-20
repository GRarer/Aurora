import { GameWindow } from "./UI/GameWindow.js";
import { preloadImages } from "./UI/Images.js";
import MainMenuUI from "./UI/menu/MainMenu.js";
import { MusicManager } from "./music/MusicManager.js";

// this is the entrypoint to the program.
window.onload = function() {
    console.log("Script Loaded");
    preloadImages().then(() => {
        MusicManager.initialize();
        GameWindow.show(new MainMenuUI());
    }, () => {});
};
