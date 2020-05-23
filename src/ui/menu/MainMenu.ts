import { UI } from "../UI.js";
import { GameWindow } from "../GameWindow.js";
import CreditsScreen from "./CreditsScreen.js";
import SettingsScreen from "./SettingsScreen.js";
import { Cheats } from "../../util/Cheats";
import WorldScreen from "../worldScreen/WorldScreen";
import Game from "../../Game";
import { MusicManager } from "../../music/MusicManager";
import { GameSave } from "../../persistence/GameSave";
import MessageScreen from "./MessageScreen.js";
import AchievementsScreen from "./AchievementsScreen.js";
import { ConfirmScreen } from "./ConfirmScreen.js";
import { Page } from "../Page.js";

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
            const game = GameSave.loadProgress();
            if (game !== undefined) {
                Cheats.enableCheats(game);
                GameWindow.show(new WorldScreen(game));
            } else {
                GameWindow.show(new MessageScreen(
                    "Deserialization Error",
                    "The saved game data is invalid",
                    new MainMenu())
                );
            }
        });

        // The options that change depending on whether or not a save exists
        const saveDependentOptions = [];
        if (saved) {
            saveDependentOptions.push(resumeButton);
            saveDependentOptions.push(UI.makeButton("start_new_game", () => {
                GameWindow.show(new ConfirmScreen(
                    "Overwrite Saved Data?",
                    this,
                    () => {
                        const newGame = Game.newGame();
                        Cheats.enableCheats(newGame);
                        GameWindow.show(new WorldScreen(newGame));
                    }
                ));
            }));
        } else {
            saveDependentOptions.push(UI.makeButton("start_game", () => {
                const newGame = Game.newGame();
                Cheats.enableCheats(newGame);
                GameWindow.show(new WorldScreen(newGame));
            }));
        }

        UI.fillHTML(this.html, [
            UI.makeHeader("Aurora", 1),
            UI.makeDivContaining(saveDependentOptions.concat([
                MainMenu.makeAudioButton(this),
                UI.makeButton("change_settings", () => GameWindow.show(new SettingsScreen(this))),
                UI.makeButton("view_achievements", () => GameWindow.show(new AchievementsScreen(this))),
                UI.makeButton("view_credits", () => GameWindow.show(new CreditsScreen())),
            ]), ["main-menu-options"]),
        ]);
    }
}
