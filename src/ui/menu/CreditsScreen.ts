import { UI } from "../UI.js";
import { GameWindow } from "../GameWindow.js";
import MainMenu from "./MainMenu.js";
import { Page } from "../Page.js";

class CreditsEntry {
    constructor(
        readonly header: string,
        readonly text: string[],
        readonly textSize: "small" | "large") {}
}

const credits: CreditsEntry[] = [
    new CreditsEntry("Grace Rarer", ["Team Lead, Game Designer, Programmer"], "large"),
    new CreditsEntry("Prindle", ["Programmer, DevOps"], "large"), // <3
    new CreditsEntry("May Lawver", ["Music Generation Programmer"], "large"),
    new CreditsEntry("Seong Ryoo", ["Environment Artist"], "large"),
    new CreditsEntry("Code Contributors", [
        "Mitchell Philipp",
        "Brad Baker",
        "Will Cooper"
    ], "small"),
    new CreditsEntry("Third Party Assets", [
        "Twemoji (MIT License for code, CC-BY for graphics)",
        "IBM Plex Mono (Open Font License)",
        "NASA Images (public domain)",
    ], "small"),
    new CreditsEntry("Aurora is released under the MIT License", [
        "Source code is available at github.com/GRarer/Aurora"
    ], "small"),
];

export default class CreditsScreen implements Page {

    readonly html: HTMLElement;
    constructor() {
        this.html = UI.makeDivContaining([
            ...credits.map(entry => this.renderCreditsEntry(entry)),
            UI.makeButton("Back", () => GameWindow.show(new MainMenu())),
        ], ["credits"]);
        this.refresh();
    }

    refresh(): void {}

    private renderCreditsEntry(entry: CreditsEntry): HTMLElement {
        return UI.makeDivContaining([
            UI.makeHeader(entry.header),
            ...entry.text.map(text => UI.makePara(text)),
        ], entry.textSize === "large" ? ["credits-entry-large"] : ["credits-entry-small"]);
    }
}
