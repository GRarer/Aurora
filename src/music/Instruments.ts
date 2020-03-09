import Instrument from "./Instrument.js";
import { Envelopes, AdsrConfig } from "./Envelopes.js";
import { Note, Notes } from "./Notes.js";
import { SampleData } from "./Samples.js";

type OscType = typeof OscillatorNode.prototype.type;

export interface OscillatorConfig {
    type: OscType; // either 'sine', 'triangle', 'square', or 'sawtooth'
    detune?: number; // detune in cents
}

export class OscillatorInstrument extends Instrument {

    type: OscType;
    _detune: number;
    env: AdsrConfig;

    constructor(osc: OscillatorConfig, env: AdsrConfig, volume: number = 1) {
        super(volume);
        this.type = osc.type;
        this._detune = 1;
        this.detune = osc.detune || 0;
        this.env = env;
    }

    set detune(n: number) {
        this._detune = Math.pow(2, n / 1200);
    }

    scheduleNote(context: AudioContext, note: Note): AudioNode {
        const freqs: number[] = Notes.detuneWithCoeff(note.note, this._detune);
        // note ending frequencies are either where they started or at the endNote
        const endfreqs: number[] = (note.endNote === undefined) ? freqs : Notes.detuneWithCoeff(note.endNote, this._detune);
        // create envelope
        const gain: GainNode = Envelopes.createAdsrEnvelope(context, note.start, note.duration,
            this.env, Math.min(1 / freqs.length, 1) * this.volume);
        const end = note.start + note.duration + (this.env.sustain || 0);
        // initialize oscillator(s)
        const oscs: OscillatorNode[] = freqs.map((freq, i) => {
            const osc = context.createOscillator();
            osc.type = this.type;
            osc.frequency.setValueAtTime(freq, note.start);
            osc.frequency.linearRampToValueAtTime(endfreqs[i], end);
            osc.start(note.start);
            osc.stop(end);
            osc.connect(gain);
            return osc;
        });
        oscs[0].onended = () => {
            gain.disconnect();
        };
        return gain;
    }

}

export class SampleInstrument extends Instrument {

    buffer: SampleData;
    env: AdsrConfig;

    constructor(buffer: SampleData, env: AdsrConfig, volume: number = 1) {
        super(volume);
        this.buffer = buffer;
        this.env = env;
    }

    scheduleNote(context: AudioContext, note: Note): AudioNode {
        const freq: number = Notes.midiNumberToFrequency(note.note);
        const bufferNode = context.createBufferSource();
        bufferNode.buffer = this.buffer.buffer;
        bufferNode.loop = this.buffer.shouldLoop;
        bufferNode.playbackRate.setValueAtTime(freq / this.buffer.freq, note.start);
        const endtime: number = note.start + note.duration + (this.env.sustain || 0);
        if (note.endNote !== undefined) {
            const endfreq: number = Notes.midiNumberToFrequency(note.endNote);
            bufferNode.playbackRate.linearRampToValueAtTime(endfreq / this.buffer.freq, endtime);
        }
        bufferNode.start(note.start);
        bufferNode.stop(endtime);
        const gain: GainNode = Envelopes.createAdsrEnvelope(context, note.start, note.duration, this.env, this.volume);
        bufferNode.connect(gain);
        bufferNode.onended = () => {
            gain.disconnect();
        };
        return gain;
    }

}
