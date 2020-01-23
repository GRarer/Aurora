import Game from "../../Game.js";
import UI from "../UI.js";
import GameWindow from "../GameWindow.js";

export default class WorldScreenHeader {
    private html: HTMLElement;
    private run: Game;
    /* This is used to determine when to apply "emphasis" css to newly-advanced quest objectives
     * It's tracked statically to persist when we leave the World Screen and then come back to a new world screen instance
     */

    constructor(run: Game) {
        this.html = UI.makeDiv(['world-screen-header']);
        this.run = run;
        this.refresh();
    }

    refresh() {
        const quitButton = UI.makeButton("Quit Game", () => {GameWindow.showMainMenu();});
        const transitionButton = UI.makeButton("Next Turn", () => {GameWindow.transitionToNextTurn();});
        const productionScreenButton = UI.makeButton("Manage Production", () => {GameWindow.showProductionScreen()});

        const questHint = this.run.getCurrentQuestHint();
        const questDescription = this.run.getCurrentQuestDescription();
        const questText = questHint? `${questDescription}\n(hint: ${questHint})` : questDescription;
        let questHTML = UI.makePara(`Objective: ${questText}`, ["world-screen-quest-description"]);

        // show message after quest completion
        const prevQuestDescription = this.run.getPreviousQuestDescription();
        if (!this.run.questCompletionShown) {
            questHTML = UI.makePara(`Completed: ${prevQuestDescription}`, ["world-screen-quest-description", "quest-description-emphasis"]);

            // reset description after time has passed
            setTimeout(() => {
                this.refresh();
            }, 1500);
        }
        this.run.questCompletionShown = true;

        UI.fillHTML(this.html, [
            quitButton,
            productionScreenButton,
            transitionButton,
            questHTML,
        ]);
    }

    getHTML(): HTMLElement {
        return this.html;
    }
}
