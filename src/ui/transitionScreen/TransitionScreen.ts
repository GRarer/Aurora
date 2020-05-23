import { UI } from "../UI.js";
import { GameWindow } from "../GameWindow.js";
import Quote from "./Quote.js";
import { indentWithNBS } from "../../util/Text.js";
import WorldScreen from "../worldScreen/WorldScreen.js";
import Game from "../../Game.js";
import { GameSave } from "../../persistence/GameSave.js";
import { Page } from "../Page.js";

// "loading" screen shown between turns
export default class TransitionScreen implements Page {
    readonly html: HTMLElement;
    private loadingArea: HTMLElement;
    private quote: Quote;
    private doneLoading: boolean = false;

    constructor(
        private game: Game,
        // used by debug "cheat code" to show a specific quote, leave undefined to get a random quote each time
        private quoteIndex?: number,
    ) {
        if (quoteIndex !== undefined) {
            this.quote = Quote.getQuote(quoteIndex);
        } else {
            this.quote = Quote.getRandomQuote();
        }

        // Add in leading quotation mark after leading whitespace
        const quotedText = indentWithNBS(this.quote.text).replace(/^(\s*)/, "$1“") + "”";

        this.loadingArea = UI.makeDivContaining([
            UI.makeDiv(["transition-loading-bar"]),
        ], ["transition-loading-area"]);

        this.html = UI.makeDivContaining([
            UI.makeDivContaining([
                UI.makePara(quotedText),
                UI.makePara(`- ${this.quote.attribution}`, ["transition-attribution"])
            ], ["transition-quote-panel"]),
            this.loadingArea
        ]);
    }

    refresh(): void {}

    // if the page shown but startLoading() is not called, the player will be stuck on this page and unable to continue
    startLoading(): void {
        const startTime = Date.now();
        this.game.completeTurn();
        GameSave.saveProgress( this.game);
        const elapsedTime = Date.now() - startTime;

        setTimeout(() => {
            UI.fillHTML(this.loadingArea, [
                UI.makeButton("Continue", () => { this.continueToNextTurn(); })
            ]);
            this.doneLoading = true;
        }, 2000 - elapsedTime);
    }

    private continueToNextTurn(): void {
        GameWindow.show(new WorldScreen(this.game));
    }

    handleKeyDown(): void {
        if (this.doneLoading) {
            this.continueToNextTurn();
        }
    }
}
