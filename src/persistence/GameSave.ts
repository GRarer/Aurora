import Game from "../Game.js";
import { Storage } from "./Storage.js";

export namespace GameSave {
    // The key to use in local storage
    const lsKey = "save" as const;

    /**
     * Save the current state of the game in local storage. Returns 'true' if
     * saving succeeded and false otherwise.
     */
    export function saveProgress(game: Game): boolean {
        return Storage.saveItem(lsKey, game, Game.schema);
    }

    /**
     * Load the previous state of the game from local storage.
     */
    export function loadProgress(): Game | undefined {
        const stored = Storage.loadItem(lsKey, Game.schema);
        if (stored?.resultType === "success") {
            return stored.result;
        } else {
            return undefined;
        }
    }

    /**
     * Check whether or not there is a stored save state. Does not guarantee
     * that the save state is valid.
     */
    export function saveExists(): boolean {
        return Storage.hasItem(lsKey);
    }

    /**
     * Clear the save state from local storage.
     */
    export function clearProgress(): void {
        Storage.removeItem(lsKey);
    }
}
