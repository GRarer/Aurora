import { Note } from './Notes.js';

export default abstract class Instrument {

    volume: number;

    constructor(volume: number) {
        this.volume = volume;
    }

    abstract scheduleNote(context: AudioContext, note: Note): AudioNode;

}
