import { AdsrOscillatorInstrument, SampleInstrument } from './Instruments.js';
import { Samples, SampleNames } from './Samples.js';

export enum Drums {
    KICK, SNARE, CLOSED_HI_HAT, OPEN_HI_HAT
}

export class Drumkit {

    tri: AdsrOscillatorInstrument;
    noise: SampleInstrument;

    constructor() {
        this.tri = new AdsrOscillatorInstrument({type: 'triangle'}, {attack: 0.01, decay: 0.2});
        this.noise = new SampleInstrument(Samples[SampleNames.WHITE_NOISE], {attack: 0.01, decay: 0.1});
    }

    //TODO: make these sound good
    scheduleHit(context: AudioContext, start: number, drum: Drums): AudioNode {
        switch (drum) {
            case Drums.KICK:
                return this.noise.scheduleNote(context, {
                    note: 20,
                    endNote: 10,
                    start: start,
                    duration: 0.1
                });
            case Drums.SNARE:
                return this.noise.scheduleNote(context, {
                    note: 30,
                    endNote: 20,
                    start: start,
                    duration: 0.1
                });
            //TODO: differentiate open and closed hi-hats
            case Drums.CLOSED_HI_HAT:
                return this.noise.scheduleNote(context, {
                    note: 70,
                    start: start,
                    duration: 0.1
                });
            case Drums.OPEN_HI_HAT:
                return this.noise.scheduleNote(context, {
                    note: 70,
                    start: start,
                    duration: 0.1
                });
        }
    }

}