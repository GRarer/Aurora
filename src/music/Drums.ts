import { SampleInstrument } from "./Instruments.js";
import { Samples, SampleNames } from "./Samples.js";
import { impossible } from "../util/Util.js";

export enum Drums {
    KICK, SNARE, CLOSED_HI_HAT, OPEN_HI_HAT
}

export class Drumkit {

    // The parameters here aren't important, since decay and volume get overwritten in scheduleHit().
    noise: SampleInstrument = new SampleInstrument(Samples[SampleNames.WHITE_NOISE], { attack: 0.01, decay: 0.1 }, 1.5);

    // TODO: generalize sampling
    snare: SampleInstrument = new SampleInstrument(Samples[SampleNames.SNARE], { sustain: 1 }, 1.5);
    kick: SampleInstrument = new SampleInstrument(Samples[SampleNames.KICK], { sustain: 1 }, 1.5);

    // TODO: make these sound good
    scheduleHit(context: AudioContext, start: number, drum: Drums): AudioNode {
        switch (drum) {
        case Drums.KICK:
            return this.kick.scheduleNote(context, {
                midiNumber: 69,
                start: start,
                duration: 1
            });
        case Drums.SNARE:
            return this.snare.scheduleNote(context, {
                midiNumber: 69,
                start: start,
                duration: 1
            });
        case Drums.CLOSED_HI_HAT:
            this.noise.env.decay = 0.05;
            this.noise.volume = 0.5;
            return this.noise.scheduleNote(context, {
                midiNumber: 70,
                start: start,
                duration: 0.05
            });
        case Drums.OPEN_HI_HAT:
            this.noise.env.decay = 0.2;
            this.noise.volume = 0.5;
            return this.noise.scheduleNote(context, {
                midiNumber: 70,
                start: start,
                duration: 0.2
            });
        default: impossible();
        }
    }

}