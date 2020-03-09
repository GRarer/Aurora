import { lerp } from "../util/Util.js";

export interface AdsrConfig {
    attack?: number;
    decay?: number;
    sustain?: number;
    release?: number;
}

export namespace Envelopes {

    export function createAdsrEnvelope(context: AudioContext, start: number, duration: number, env: AdsrConfig, volume: number = 1): GainNode {
        // these are all optional, so make sure they're not undefined
        const { attack = 0, sustain = 0, decay = 0, release = 0 } = env;
        const gainNode: GainNode = context.createGain();
        gainNode.gain.setValueAtTime(0, start);
        if (duration < attack) {
            // note gets cut off in middle of attack
            gainNode.gain.linearRampToValueAtTime(lerp(0, volume, duration / attack), start + duration);
            gainNode.gain.linearRampToValueAtTime(0, start + duration + release);
        } else if (duration < attack + decay) {
            // note gets cut off in middle of decay
            gainNode.gain.linearRampToValueAtTime(volume, start + attack);
            gainNode.gain.linearRampToValueAtTime(lerp(volume, volume * sustain, (duration - attack) / decay), start + attack + decay);
            gainNode.gain.linearRampToValueAtTime(0, start + duration + release);
        } else {
            // envelope executes fully
            gainNode.gain.linearRampToValueAtTime(volume, start + attack);
            gainNode.gain.linearRampToValueAtTime(volume * sustain, start + attack + decay);
            gainNode.gain.linearRampToValueAtTime(0, start + duration + release);
        }
        return gainNode;
    }

}
