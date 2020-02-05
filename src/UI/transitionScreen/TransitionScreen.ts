import UI from "../UI.js";
import GameWindow from "../GameWindow.js";

// "loading" screen shown between turns
export default class TransitionScreen {
    private html: HTMLElement;
    private loadingArea: HTMLElement;
    private loadingBar: HTMLElement;
    private quote: [string, string];

    //Quotes are of form ["quote", "attribution"]
    //The quote will be automatically formatted to add quotation marks and a dash before the attribution
    private static readonly QUOTES: [string, string][] = [
        ["quote1", "attribution1"],
        ["quote2", "attribution2"],
        ["quote3", "attribution3"],
        ["quote4", "attribution4"],
        ["quote5", "attribution5"],
        ["quote6", "attribution6"],
        ["quote7", "attribution7"],
        ["quote8", "attribution8"]
    ];

    constructor() {
        this.html = UI.makeDiv();
        this.loadingBar = UI.makeDiv(['transition-loading-bar']);
        this.loadingArea = UI.makeDivContaining([
            this.loadingBar
        ], ['transition-loading-area']);
        this.quote = TransitionScreen.QUOTES[Math.floor(Math.random() * TransitionScreen.QUOTES.length)];

        UI.fillHTML(this.html, [
            UI.makeDivContaining([
                UI.makePara(this.quote[0].replace(/^ *(?=[^"])/, "\"").replace(/(?<=[^"]) *$/, "\""), ['transition-quote']),
                UI.makePara(this.quote[1].replace(/^ *(?=[^\-])/, "- "), ['transition-attribution'])
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
