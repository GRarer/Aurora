import { lerp } from '../util/Util.js';

export interface AdsrConfig {
    attack?: number,
    decay?: number,
    sustain?: number,
    release?: number
}

export class Envelopes {
    
    static createAdsrEnvelope(context: AudioContext, start: number, duration: number, env: AdsrConfig, volume: number = 1): GainNode {
        //these are all optional, so make sure they're not undefined
        const attack = env.attack || 0;
        const decay = env.decay || 0;
        const sustain = env.sustain || 0;
        const release = env.release || 0;
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