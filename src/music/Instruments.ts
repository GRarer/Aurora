import Instrument from './Instrument.js';
import { Notes } from './Notes.js';
import { lerp } from '../util/Util.js';

type OscType = typeof OscillatorNode.prototype.type;

export class EnvOscInstrument extends Instrument {

    type: OscType;
    attack: number;
    decay: number;
    sustain: number;
    release: number;

    constructor(type: OscType, attack: number, decay: number, sustain: number, release: number) {
        super();
        this.type = type;
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
    }

    scheduleNote(context: AudioContext, note: number, duration: number, start: number): AudioNode {
        const freq: number = Notes.midiNumberToFrequency(note);
        //initialize oscillator
        const osc: OscillatorNode = context.createOscillator();
        osc.type = this.type;
        osc.frequency.value = freq;
        osc.start(start);
        osc.stop(start + duration + this.sustain);
        //initialize gain
        const gain: GainNode = context.createGain();
        gain.gain.setValueAtTime(0, start);
        if (duration < this.attack) {
            //note gets cut off in middle of attack
            gain.gain.linearRampToValueAtTime(lerp(0, 1, duration / this.attack), start + duration);
            gain.gain.linearRampToValueAtTime(0, start + duration + this.release);
        } else if (duration < this.attack + this.decay) {
            //note gets cut off in middle of decay
            gain.gain.linearRampToValueAtTime(1, start + this.attack);
            gain.gain.linearRampToValueAtTime(lerp(1, this.sustain, (duration - this.attack)/this.decay), start + this.attack + this.decay);
            gain.gain.linearRampToValueAtTime(0, start + duration + this.release);
        } else {
            //envelope executes fully
            gain.gain.linearRampToValueAtTime(1, start + this.attack);
            gain.gain.linearRampToValueAtTime(this.sustain, start + this.attack + this.decay);
            gain.gain.linearRampToValueAtTime(0, start + duration + this.release);
        }
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
