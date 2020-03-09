import { Note } from "./Notes.js";

export default abstract class Instrument {

    constructor(public volume: number) {}

    abstract scheduleNote(context: AudioContext, note: Note): AudioNode;

}
