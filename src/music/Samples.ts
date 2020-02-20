// TODO: do this better
const tempAudioContext = new AudioContext();

export interface SampleData {
    buffer: AudioBuffer;
    loop: boolean; // true if should loop, false otherwise
    freq: number; // frequency of sample for pitchshifting reasons
}

export enum SampleNames {
    WHITE_NOISE = "white_noise",
    SNARE = "snare",
    KICK = "kick"
}

export namespace SampleUtils {

    export function createBufferFromGenerator(length: number, func: (i: number) => number): AudioBuffer {
        const arr: Float32Array = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = func(i);
        }
        const buffer = new AudioBuffer({ numberOfChannels: 1, sampleRate: 44100, length: length });
        buffer.copyToChannel(arr, 0);
        return buffer;
    }

    export function createBufferFromAudioData(length: number, filename: string): AudioBuffer {
        console.log(filename);
        const buffer = new AudioBuffer({ numberOfChannels: 1, sampleRate: 44100, length: length });
        fetch(`assets/${filename}`, {
            headers: new Headers({
                "Content-Type": "audio/ogg"
            })
        }).then(async (value: Response) => {
            const arr = await value.arrayBuffer();
            const tempBuffer = await tempAudioContext.decodeAudioData(arr);
            buffer.copyToChannel(tempBuffer.getChannelData(0), 0);
        }, () => {});
        return buffer;
    }

}

export const Samples: Record<SampleNames, SampleData> = {
    "white_noise": { buffer: SampleUtils.createBufferFromGenerator(44100, (i) => 2 * Math.random() - 1), loop: true, freq: 440 },
    "snare": { buffer: SampleUtils.createBufferFromAudioData(22050, "samples/snare.ogg"), loop: false, freq: 440 },
    "kick": { buffer: SampleUtils.createBufferFromAudioData(22050, "samples/kick.ogg"), loop: false, freq: 440 }
};
