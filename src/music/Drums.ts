import { AdsrOscillatorInstrument, SampleInstrument } from './Instruments.js';
import { Samples, SampleNames } from './Samples.js';

export enum Drums {
    KICK, SNARE, CLOSED_HI_HAT, OPEN_HI_HAT
}

export class Drumkit {

    tri: AdsrOscillatorInstrument;
    noise: SampleInstrument;

    constructor() {
        this.tri = new AdsrOscillatorInstrument({type: 'triangle'}, {attack: 0.01, decay: 0.2}, 5);
        this.noise = new SampleInstrument(Samples[SampleNames.WHITE_NOISE], {attack: 0.01, decay: 0.1}, 1.5);
    }

    //TODO: make these sound good
    scheduleHit(context: AudioContext, start: number, drum: Drums): AudioNode {
        switch (drum) {
            case Drums.KICK:
                return this.tri.scheduleNote(context, {
                    note: 40,
                    endNote: 20,
                    start: start,
                    duration: 0.2
                });
            case Drums.SNARE:
                this.noise.env.decay = 0.1;
                this.noise.volume = 1.5;
                return this.noise.scheduleNote(context, {
                    note: 25,
                    endNote: 37,
                    start: start,
                    duration: 0.1
                });
            case Drums.CLOSED_HI_HAT:
                this.noise.env.decay = 0.05;
                this.noise.volume = 1;
                return this.noise.scheduleNote(context, {
                    note: 70,
                    start: start,
                    duration: 0.05
                });
            case Drums.OPEN_HI_HAT:
                this.noise.env.decay = 0.2;
                this.noise.volume = 1;
                return this.noise.scheduleNote(context, {
                    note: 70,
                    start: start,
                    duration: 0.2
                });
        }
    }

}