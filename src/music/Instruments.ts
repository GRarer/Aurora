import Instrument from "./Instrument.js";
import { Envelopes, AdsrConfig } from "./Envelopes.js";
import { Note, Notes } from "./Notes.js";
import { SampleData } from "./Samples.js";

type OscType = OscillatorNode["type"];

export interface OscillatorConfig {
    type: OscType; // either 'sine', 'triangle', 'square', or 'sawtooth'
    detune?: number; // detune in cents
}

// A basic instrument that uses a basic waveform (with or without detune).
export class OscillatorInstrument extends Instrument {

    type: OscType;
    private _detune: number;
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
        const freqs: number[] = Notes.detuneWithCoeff(note.midiNumber, this._detune);
        // note ending frequencies are either where they started or at the endNote
        const endfreqs: number[] = (note.endNote === undefined) ? freqs : Notes.detuneWithCoeff(note.endNote, this._detune);
        // volume scaling so multiple oscillators from detune don't result in louder sounds
        const volume = Math.min(1 / freqs.length, 1) * this.volume;
        // create envelope
        const gain: GainNode = Envelopes.createAdsrEnvelope(context, note.start, note.duration,
            this.env, volume);
        const end = note.start + note.duration + (this.env.sustain || 0);
        // initialize oscillator(s)
        freqs.forEach((freq, i) => {
            const osc = context.createOscillator();
            osc.type = this.type;
            osc.frequency.setValueAtTime(freq, note.start);
            osc.frequency.linearRampToValueAtTime(endfreqs[i], end);
            osc.start(note.start);
            osc.stop(end);
            osc.connect(gain);
            osc.onended = () => {
                gain.disconnect();
            };
        });
        return gain;
    }

}

// An instrument that uses an audio sample, speeding it up or slowing it down to play different notes.
export class SampleInstrument extends Instrument {

    buffer: SampleData;
    env: AdsrConfig;

    constructor(buffer: SampleData, env: AdsrConfig, volume: number = 1) {
        super(volume);
        this.buffer = buffer;
        this.env = env;
    }

    scheduleNote(context: AudioContext, note: Note): AudioNode {
        const freq: number = Notes.midiNumberToFrequency(note.midiNumber);
        const bufferNode = context.createBufferSource();
        bufferNode.buffer = this.buffer.buffer;
        bufferNode.loop = this.buffer.shouldLoop;
        // since samples have a frequency already, we have to change playback rate to change pitch
        // if we want to play an 880Hz note, we need to play a 440Hz sample twice as fast, etc.
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
