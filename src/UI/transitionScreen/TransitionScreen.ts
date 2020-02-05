import UI from "../UI.js";
import GameWindow from "../GameWindow.js";
import Quote from "./Quote.js";

// "loading" screen shown between turns
export default class TransitionScreen {
    private html: HTMLElement;
    private loadingArea: HTMLElement;
    private loadingBar: HTMLElement;
    private quote: Quote;

    constructor() {
        this.html = UI.makeDiv();
        this.loadingBar = UI.makeDiv(['transition-loading-bar']);
        this.loadingArea = UI.makeDivContaining([
            this.loadingBar
        ], ['transition-loading-area']);
        this.quote = Quote.getRandomQuote();

        UI.fillHTML(this.html, [
            UI.makeDivContaining([
                UI.makePara(this.quote.getQuote()),
                UI.makePara(this.quote.getAttribution(), ['transition-attribution'])
            ], ['transition-quote-panel']),
            this.loadingArea
        ]);
    }

    getHTML() {
        return this.html;
    }

    startLoading() {
        setTimeout(() => this.loadingArea.classList.add('loading'));
    }

    revealButton() {
        setTimeout(() => this.loadingArea.classList.add('loaded'));
        setTimeout(() => {
            UI.fillHTML(this.loadingArea, [
                UI.makeButton("Continue", this.continueToNextTurn)
            ]);
        }, 750);
    }

    private continueToNextTurn() {
        GameWindow.showWorldScreen();
    }
}
