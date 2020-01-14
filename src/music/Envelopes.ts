import { lerp } from '../util/Util.js';

export default class Envelopes {
    
    static createAdsrEnvelope(context: AudioContext, start: number, duration: number, attack: number,
        decay: number, sustain: number, release: number, volume: number = 1): GainNode {
        const gain: GainNode = context.createGain();
        gain.gain.setValueAtTime(0, start);
        if (duration < attack) {
            //note gets cut off in middle of attack
            gain.gain.linearRampToValueAtTime(lerp(0, volume, duration / attack), start + duration);
            gain.gain.linearRampToValueAtTime(0, start + duration + release);
        } else if (duration < attack + decay) {
            //note gets cut off in middle of decay
            gain.gain.linearRampToValueAtTime(volume, start + attack);
            gain.gain.linearRampToValueAtTime(lerp(volume, volume * sustain, (duration - attack)/decay), start + attack + decay);
            gain.gain.linearRampToValueAtTime(0, start + duration + release);
        } else {
            //envelope executes fully
            gain.gain.linearRampToValueAtTime(volume, start + attack);
            gain.gain.linearRampToValueAtTime(volume * sustain, start + attack + decay);
            gain.gain.linearRampToValueAtTime(0, start + duration + release);
        }
        return gain;
    }

}