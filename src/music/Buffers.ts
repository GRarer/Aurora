export interface BufferConfig {
    buffer: AudioBuffer,
    loop: boolean, //true if should loop, false otherwise
    freq: number //frequency of sample for pitchshifting reasons
}

export enum BufferNames {
    WHITE_NOISE = 'white_noise'
}

export class Buffers {

    static createBufferFromGenerator(length: number, func: (i: number) => number): AudioBuffer {
        const arr: Float32Array = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = func(i);
        }
        const buffer = new AudioBuffer({numberOfChannels: 1, sampleRate: 44100, length: length});
        buffer.copyToChannel(arr, 0);
        return buffer;
    }

}

export const AudioBuffers: Record<BufferNames, BufferConfig> = {
    'white_noise': {buffer: Buffers.createBufferFromGenerator(44100, (i) => 2 * Math.random() - 1), loop: true, freq: 440}
}