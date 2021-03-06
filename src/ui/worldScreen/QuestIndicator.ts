import { GameWindow } from "../GameWindow.js";
import Game from "../../Game.js";
import { UI } from "../UI.js";
import Ending from "../../quests/Ending.js";
import EndScreen from "../menu/EndScreen.js";
import { Page } from "../Page.js";

export default class QuestIndicator implements Page {

    readonly html: HTMLElement;

    constructor(
        private game: Game
    ) {
        this.html = UI.makeDiv(["world-screen-quest-description"]);
        this.refresh();
    }

    refresh(): void {
        const questDescription = this.game.getCurrentQuestDescription();
        const questHint = this.game.getCurrentQuestHint();
        const questText = questHint ? `${questDescription}\n(hint: ${questHint})` : questDescription;
        let questLabel = UI.makePara(`Objective: ${questText}`);

        if (!this.game.questCompletionShown) {
            this.game.questCompletionShown = true;
            questLabel = UI.makePara(
                `Completed: ${this.game.getPreviousQuestDescription()}`,
                ["quest-description-emphasis"]
            );

            // reset description after time has passed
            setTimeout(() => {
                const endState: Ending | undefined = this.game.getQuestEndState();
                if (endState) {
                    GameWindow.show(new EndScreen(endState));
                } else {
                    this.refresh();
                }
            }, 1500);
        }

        UI.fillHTML(this.html, [questLabel]);
    }
}
