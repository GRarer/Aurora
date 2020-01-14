import Instrument from './Instrument.js';
import { Notes } from './Notes.js';
import Envelopes from './Envelopes.js';
import { lerp } from '../util/Util.js';

type OscType = typeof OscillatorNode.prototype.type;

export interface OscConfig {
    type: OscType, //either 'sine', 'triangle', 'square', or 'sawtooth'
    detune?: number //detune in cents
}

export interface AdsrConfig {
    attack?: number,
    decay?: number,
    sustain?: number,
    release?: number
}

export class EnvOscInstrument extends Instrument {

    type: OscType;
    _detune: number;
    attack: number;
    decay: number;
    sustain: number;
    release: number;

    constructor(osc: OscConfig, env: AdsrConfig) {
        super();
        this.type = osc.type;
        this._detune = 1;
        this.detune = osc.detune || 0;
        this.attack = env.attack || 0;
        this.decay = env.decay || 0;
        this.sustain = env.sustain || 0;
        this.release = env.release || 0;
    }

    set detune(n: number) {
        this._detune = Math.pow(2, n/1200);
    }

    scheduleNote(context: AudioContext, note: number, duration: number, start: number): AudioNode {
        const freq: number = Notes.midiNumberToFrequency(note);
        let freqs: number[] = [];
        if (this._detune === 1) {
            freqs = [freq];
        } else {
            freqs = [freq/this._detune, freq, freq * this._detune];
        }
        //create envelope
        const gain: GainNode = Envelopes.createAdsrEnvelope(context, start, duration, this.attack, this.decay, this.sustain, this.release, Math.min(1 / freqs.length, 1));
        //initialize oscillator(s)
        const oscs: OscillatorNode[] = freqs.map(freq => {
            const osc = context.createOscillator();
            osc.type = this.type;
            osc.frequency.value = freq;
            osc.start(start);
            osc.stop(start + duration + this.sustain);
            osc.connect(gain);
            return osc;
        });
        return gain;
    }

}