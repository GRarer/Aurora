import Game from "../../Game.js";
import UI from "../UI.js";
import GameWindow from "../GameWindow.js";
import Conversion from "../../resources/Conversion.js";
import Inventory from "../../resources/Inventory.js";

// the production screen is where the player selects the priority order for resource conversions
export default class ProductionScreen {
    private html: HTMLElement;
    private run: Game;

    constructor(run: Game) {
        this.run = run;
        this.html = UI.makeDiv(['production-screen']);
        this.refresh();
    }

    refresh() {
        // clone of the inventory that represents what the inventory will be after this turn's conversions are applied
        const inventoryCopy = this.run.inventory.clone();

        const freeConversions: Conversion[] = this.run.getResourceConversions().filter(conversion => (conversion.isFree()));
        const freeConversionsHTML: HTMLElement[] = freeConversions.map(conversion => this.renderConversion(conversion, true, false));
        inventoryCopy.applyConversions(freeConversions);

        const costlyConversions: Conversion[] = this.run.getResourceConversions().filter((conversion: Conversion) => (!conversion.isFree()));
        const costlyConversionsHTML: HTMLElement[] = [];
        costlyConversions.forEach((conversion: Conversion) => {
            if (inventoryCopy.canAfford(conversion.inputs) && inventoryCopy.hasEnoughWorkers(conversion.requiredWorkers)) {
                costlyConversionsHTML.push(this.renderConversion(conversion, true, true));
                inventoryCopy.applyConversions([conversion]);
            } else {
                costlyConversionsHTML.push(this.renderConversion(conversion, false, true));
            }
        });

        UI.fillHTML(this.html, [
            UI.makePara("Resource Production Report", [`production-screen-label`]),
            UI.makePara(`Available workers at start of next production cycle: ${this.run.inventory.getAvailableWorkers()}`, [`production-screen-label`]),
            UI.makePara("Resources available at start of next production cycle:", [`production-screen-label`]),
            this.renderInventory(this.run.inventory),
            UI.makePara("Resource generation in next production cycle:", [`production-screen-label`]),
            UI.makeDivContaining(freeConversionsHTML),
            UI.makePara("Resource conversion in next production cycle:", [`production-screen-label`]),
            UI.makeDivContaining(costlyConversionsHTML),
            UI.makePara(`Unused workers at end of next production cycle: ${inventoryCopy.getAvailableWorkers()}`, [`production-screen-label`]),
            UI.makePara("Resources available at end of next production cycle:", [`production-screen-label`]),
            this.renderInventory(inventoryCopy),
            UI.makeButton("Back", () => {GameWindow.showWorldScreen();}, ['production-screen-back-button']),
        ]);
    }

    getHTML() {
        return this.html;
    }

    private renderInventory(inventory: Inventory): HTMLElement {
        const resourceDescriptions = inventory.getInventoryStrings().map(resourceString => UI.makePara(resourceString));

        if (resourceDescriptions.length == 0) {
            resourceDescriptions.push(UI.makePara("(none)"));
        }

        return UI.makeDivContaining(resourceDescriptions, ['production-screen-inventory']);
    }

    renderConversion(conversion: Conversion, canAfford: boolean, showMoveButtons: boolean) {
        const div = UI.makeDiv(['flex-horizontal']);

        let text = conversion.toString();
        let cssClass = 'conversion-description-normal'; // css class that changes to show the conversion's status
        if (!conversion.enabled) {
            text = `(disabled) ${conversion.toString()}`;
            cssClass = 'conversion-description-disabled';
        } else if (!canAfford) {
            text = `(cannot afford) ${conversion.toString()}`;
            cssClass = `conversion-description-cannot-afford`;
        }

        div.appendChild(UI.makeButton(text, () => {this.toggle(conversion);}, [cssClass, `conversion-description`]));

        if (showMoveButtons) {
            div.appendChild(UI.makeButton("Move Up", () => this.moveConversionUp(conversion)));
            div.appendChild(UI.makeButton("Move Down", () => this.moveConversionDown(conversion)));
        }

        return div;
    }

    private moveConversionUp(conversion: Conversion) {
        this.run.increaseConversionPriority(conversion);
        this.refresh();
    }

    private moveConversionDown(conversion: Conversion) {
        this.run.decreaseConversionPriority(conversion);
        this.refresh();
    }

    private toggle(conversion: Conversion) {
        conversion.enabled = !conversion.enabled;
        this.refresh();
    }
}
