import { UI } from "../UI.js";
import { GameWindow, Page } from "../GameWindow.js";
import CreditsScreen from "./CreditsScreen.js";
import SettingsScreen from "./SettingsScreen.js";
import { enableCheats } from "../../util/Cheats";
import WorldScreen from "../worldScreen/WorldScreen";
import Game from "../../Game";
import { MusicManager } from "../../music/MusicManager";
import { GameSave } from "../../persistence/GameSave";
import OverwriteConfirmScreen from "./OverwriteConfirmScreen.js";
import Conversion from "../../resources/Conversion.js";
import MessageScreen from "./MessageScreen.js";

export default class MainMenu implements Page {

    readonly html: HTMLElement;

    constructor() {
        this.html = UI.makeDiv(["main-menu"]);
        this.refresh();
    }

    static makeAudioButton(menuPage: Page): HTMLButtonElement {
        const musicPlaying = MusicManager.isPlaying();
        if (!musicPlaying) {
            return UI.makeButton("enable_audio", () => {
                MusicManager.initialize();
                menuPage.refresh();
            });
        } else {
            return UI.makeButton("disable_audio", async (button: HTMLButtonElement) => {
                button.disabled = true;
                button.innerText = "please_wait";
                await MusicManager.stop();
                menuPage.refresh();
            });
        }
    }

    refresh(): void {
        const saved: boolean = GameSave.saveExists();

        const resumeButton = UI.makeButton("resume_game", () => {
            const data = GameSave.loadProgress();
            if (data) {
                Conversion.unsafeSetNextPriority(data.nextConversionPriority);
                enableCheats(data.game);
                GameWindow.show(new WorldScreen(data.game));
            } else {
                GameWindow.show(new MessageScreen("Deserialization Error", "The saved game data is invalid", new MainMenu()));
            }
        });

        const startButton = UI.makeButton(saved ? "start_new_game" : "start_game", () => {
            if (saved) {
                GameWindow.show(new OverwriteConfirmScreen());
            } else {
                const newGame = Game.newGame();
                enableCheats(newGame);
                GameWindow.show(new WorldScreen(newGame));
            }
        });

        UI.fillHTML(this.html, [
            UI.makeHeader("Aurora", 1),
            UI.makeDivContaining([
                saved ? resumeButton : UI.makeDiv(),
                startButton,
                MainMenu.makeAudioButton(this),
                UI.makeButton("change_settings", () => GameWindow.show(new SettingsScreen(this))),
                UI.makeButton("view_credits", () => GameWindow.show(new CreditsScreen())),
            ], ["main-menu-options"]),
        ]);
    }
}
