import { AdsrOscillatorInstrument, SampleInstrument } from './Instruments.js';
import { Samples, SampleNames } from './Samples.js';

export enum Drums {
    KICK, SNARE, CLOSED_HI_HAT, OPEN_HI_HAT
}

export class Drumkit {

    tri: AdsrOscillatorInstrument;
    noise: SampleInstrument;

    //TODO: generalize sampling
    snare: SampleInstrument;
    kick: SampleInstrument;

    constructor() {
        this.tri = new AdsrOscillatorInstrument({type: 'triangle'}, {attack: 0.01, decay: 0.2}, 5);
        this.noise = new SampleInstrument(Samples[SampleNames.WHITE_NOISE], {attack: 0.01, decay: 0.1}, 1.5);
        this.snare = new SampleInstrument(Samples[SampleNames.SNARE], {sustain: 1}, 1.5);
        this.kick = new SampleInstrument(Samples[SampleNames.KICK], {sustain: 1}, 1.5);
    }

    //TODO: make these sound good
    scheduleHit(context: AudioContext, start: number, drum: Drums): AudioNode {
        switch (drum) {
            case Drums.KICK:
                return this.kick.scheduleNote(context, {
                    note: 69,
                    start: start,
                    duration: 1
                });
            case Drums.SNARE:
                return this.snare.scheduleNote(context, {
                    note: 69,
                    start: start,
                    duration: 1
                });
            case Drums.CLOSED_HI_HAT:
                this.noise.env.decay = 0.05;
                this.noise.volume = 0.5;
                return this.noise.scheduleNote(context, {
                    note: 70,
                    start: start,
                    duration: 0.05
                });
            case Drums.OPEN_HI_HAT:
                this.noise.env.decay = 0.2;
                this.noise.volume = 0.5;
                return this.noise.scheduleNote(context, {
                    note: 70,
                    start: start,
                    duration: 0.2
                });
        }
    }

}