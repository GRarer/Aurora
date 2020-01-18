import Instrument from './Instrument.js';
import { Notes } from './Notes.js';
import {Envelopes, AdsrConfig} from './Envelopes.js';
import { lerp } from '../util/Util.js';
import { BufferConfig } from './Buffers.js';

type OscType = typeof OscillatorNode.prototype.type;

export interface OscConfig {
    type: OscType, //either 'sine', 'triangle', 'square', or 'sawtooth'
    detune?: number //detune in cents
}

export class EnvOscInstrument extends Instrument {

    type: OscType;
    _detune: number;
    env: AdsrConfig

    constructor(osc: OscConfig, env: AdsrConfig) {
        super();
        this.type = osc.type;
        this._detune = 1;
        this.detune = osc.detune || 0;
        this.env = env;
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
        const gain: GainNode = Envelopes.createAdsrEnvelope(context, start, duration, this.env, Math.min(1 / freqs.length, 1));
        //initialize oscillator(s)
        const oscs: OscillatorNode[] = freqs.map(freq => {
            const osc = context.createOscillator();
            osc.type = this.type;
            osc.frequency.value = freq;
            osc.start(start);
            osc.stop(start + duration + (this.env.sustain || 0));
            osc.connect(gain);
            return osc;
        });
        oscs[0].onended = () => {
            gain.disconnect();
        }
        return gain;
    }

}

export class BufferInstrument extends Instrument {

    buffer: BufferConfig;
    env: AdsrConfig;

    constructor(buffer: BufferConfig, env: AdsrConfig) {
        super();
        this.buffer = buffer;
        this.env = env;
    }

    scheduleNote(context: AudioContext, note: number, duration: number, start: number): AudioNode {
        const freq: number = Notes.midiNumberToFrequency(note);
        const bufferNode = context.createBufferSource();
        bufferNode.buffer = this.buffer.buffer;
        bufferNode.loop = this.buffer.loop;
        bufferNode.playbackRate.setValueAtTime(freq / this.buffer.freq, start);
        bufferNode.start(start);
        bufferNode.stop(start + duration + (this.env.sustain || 0));
        const gain: GainNode = Envelopes.createAdsrEnvelope(context, start, duration, this.env, 1);
        bufferNode.connect(gain);
        bufferNode.onended = () => {
            gain.disconnect();
        }
        return gain;
    }

}