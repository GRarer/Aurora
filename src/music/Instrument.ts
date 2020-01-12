export default abstract class Instrument {

    abstract scheduleNote(context: AudioContext, note: number, duration: number, time: number): AudioNode;

}
