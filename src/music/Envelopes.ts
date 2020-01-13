import { lerp } from '../util/Util.js';

export default class Envelopes {
    
    static createAdsrEnvelope(context: AudioContext, start: number, duration: number, attack: number,
        decay: number, sustain: number, release: number): GainNode {
        const gain: GainNode = context.createGain();
        gain.gain.setValueAtTime(0, start);
        if (duration < attack) {
            //note gets cut off in middle of attack
            gain.gain.linearRampToValueAtTime(lerp(0, 1, duration / attack), start + duration);
            gain.gain.linearRampToValueAtTime(0, start + duration + release);
        } else if (duration < attack + decay) {
            //note gets cut off in middle of decay
            gain.gain.linearRampToValueAtTime(1, start + attack);
            gain.gain.linearRampToValueAtTime(lerp(1, sustain, (duration - attack)/decay), start + attack + decay);
            gain.gain.linearRampToValueAtTime(0, start + duration + release);
        } else {
            //envelope executes fully
            gain.gain.linearRampToValueAtTime(1, start + attack);
            gain.gain.linearRampToValueAtTime(sustain, start + attack + decay);
            gain.gain.linearRampToValueAtTime(0, start + duration + release);
        }
        return gain;
    }

}