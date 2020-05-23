import { UI } from "../UI.js";
import { GameWindow } from "../GameWindow.js";
import MainMenu from "./MainMenu.js";
import SettingsScreen from "./SettingsScreen.js";
import Game from "../../Game.js";
import WorldScreen from "../worldScreen/WorldScreen.js";
import { GameSave } from "../../persistence/GameSave.js";
import { Page } from "../Page.js";

export default class PauseMenu implements Page {
    readonly html: HTMLElement;

    constructor(private game: Game) {
        this.html = UI.makeDivContaining([
            UI.makeHeader("Game Paused", 2),
            UI.makeDivContaining([
                UI.makeButton("resume_game", () => {
                    GameWindow.show(new WorldScreen(this.game));
                }),
                MainMenu.makeAudioButton(this),
                UI.makeButton("change_settings", () => {
                    GameWindow.show(new SettingsScreen(this));
                }),
                UI.makeButton("save_and_quit", () => {
                    GameSave.saveProgress(this.game);
                    GameWindow.show(new MainMenu());
                }),
            ], ["main-menu-options"]),
        ], ["main-menu", "pause-menu"]);
    }

    refresh(): void {}
}
