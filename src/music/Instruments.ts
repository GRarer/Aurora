import Instrument from './Instrument.js';
import { Notes } from './Notes.js';
import Envelopes from './Envelopes.js';
import { lerp } from '../util/Util.js';

type OscType = typeof OscillatorNode.prototype.type;

export interface OscConfig {
    type: OscType
}

export interface AdsrConfig {
    attack?: number,
    decay?: number,
    sustain?: number,
    release?: number
}

export class EnvOscInstrument extends Instrument {

    type: OscType;
    attack: number;
    decay: number;
    sustain: number;
    release: number;

    constructor(osc: OscConfig, env: AdsrConfig) {
        super();
        this.type = osc.type;
        this.attack = env.attack || 0;
        this.decay = env.decay || 0;
        this.sustain = env.sustain || 0;
        this.release = env.release || 0;
    }

    scheduleNote(context: AudioContext, note: number, duration: number, start: number): AudioNode {
        const freq: number = Notes.midiNumberToFrequency(note);
        //initialize oscillator
        const osc: OscillatorNode = context.createOscillator();
        osc.type = this.type;
        osc.frequency.value = freq;
        osc.start(start);
        osc.stop(start + duration + this.sustain);
        const gain: GainNode = Envelopes.createAdsrEnvelope(context, start, duration, this.attack, this.decay, this.sustain, this.release);
        //connect nodes
        osc.connect(gain);
        //make sure nodes get cleaned up afterward
        osc.onended = () => {
            gain.disconnect();
            osc.disconnect();
        }
        return gain;
    }

}