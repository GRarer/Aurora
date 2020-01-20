import { Note } from './Notes.js';

export default abstract class Instrument {

    abstract scheduleNote(context: AudioContext, note: Note): AudioNode;

}
