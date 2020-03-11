import { Note } from "./Notes.js";
import Instrument from "./Instrument.js";
import { OscillatorInstrument } from "./Instruments.js";
import { Random } from "../util/Random.js";
import { Scales, Scale, ScaleQuery } from "./Scales.js";
import Rhythm from "./Rhythm.js";
import { Drumkit, Drums } from "./Drums.js";
import { Arrays, NonEmptyArray } from "../util/Arrays.js";
import { mod, impossible } from "../util/Util.js";

enum MeasureContents {
    DRUMS, CHORDS
}

interface MusicState {
    beatsPerMinute: number;
    rhythm: Rhythm;
    root: number; // the root of the current key. (0 is C, 1 is C#, ..., 11 is B)
    scale: Scale;
    progression: number[][]; // current chord progression
    drumLoop: Drums[];
    chordIndex: number; // index of current chord
    queue: MeasureContents[][];
}

enum ChordFunction {
    TONIC = "tonic",
    SUBDOMINANT = "subdominant",
    DOMINANT = "dominant",
    AMBIGUOUS = "ambiguous"
}

export namespace MusicManager {

    export const context: AudioContext = new AudioContext();

    export const instruments = {
        arp: new OscillatorInstrument(
            { type: "sawtooth", detune: 3 },
            { attack: 0.01, decay: 0.05, sustain: 0.0, release: 0.1 }
        ),
        bass: new OscillatorInstrument(
            { type: "triangle", detune: 2 },
            { attack: 0.01, decay: 0.01, sustain: 1.0, release: 0.1 }
        ),
        pad: new OscillatorInstrument(
            { type: "triangle", detune: 4 },
            { attack: 1.0, decay: 0.1, sustain: 0.5, release: 0.5 }
        )
    };

    export const masterGain: GainNode = context.createGain();

    const state: MusicState = {
        beatsPerMinute: 220,
        rhythm: new Rhythm(),
        root: 0, // middle C
        scale: 2741, // major
        progression: [],
        chordIndex: 0,
        drumLoop: [],
        queue: []
    };

    // All chord progressions we generate here start with the tonic and end with one of these patterns.
    const backHalves: NonEmptyArray<ChordFunction[]> = [
        [ChordFunction.TONIC, ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.SUBDOMINANT, ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.AMBIGUOUS, ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT, ChordFunction.AMBIGUOUS]
    ];

    const functionDegrees: Record<ChordFunction, NonEmptyArray<number>> = {
        "tonic": [0, 5], // I and VI
        "subdominant": [1, 3], // II and IV
        "dominant": [4, 6], // V and VII
        "ambiguous": [2] // III
    };

    function generateChordProgression(scale: Scale, root: number, extensions: number = 4): number[][] {
        const pitchClass: number[] = Scales.getPitchClass(scale);
        const chordDegrees: number[] = Random.fromArray(backHalves) // take one of the valid chord patterns
            // replace functions like "dominant" "subdominant" etc with degrees
            .map(f => Random.fromArray(functionDegrees[f]));
        chordDegrees.unshift(0); // make sure it starts with the tonic
        // convert degrees to full diatonic chords
        return chordDegrees.map(degree => Arrays.generate(
            extensions, (i: number) =>
                Scales.indexIntoPitchClass(pitchClass, degree + 2 * i) + root)
        );
    }

    function generateDrumLoop(): Drums[] {
        const subdivision: number[] = state.rhythm.subdivision;
        return Arrays.flatten(subdivision.map((beats: number, index: number) => {
            // start on kick on the strong beats and snare on the weak beats
            const arr: Drums[] = [(index % 2 === 0) ? Drums.KICK : Drums.SNARE];
            // follow with hi-hats
            for (let i = 0; i < beats - 1; i++) {
                if (index === subdivision.length - 1 && i === beats - 2) {
                    arr.push(Drums.OPEN_HI_HAT); // end the measure on an open hi-hat
                } else {
                    arr.push(Drums.CLOSED_HI_HAT);
                }
            }
            return arr;
        }));
    }

    function scheduleDrum(start: number, drum: Drums): void {
        const drumOut: AudioNode = Drumkit.scheduleHit(context, start, drum);
        drumOut.connect(masterGain);
    }

    function scheduleNote(note: Note, inst: Instrument): void {
        const instOut: AudioNode = inst.scheduleNote(context, note);
        instOut.connect(masterGain);
    }

    function octave(root: number, octave: number): number {
        return mod(root, 12) + octave * 12;
    }

    // Change key, time signature, etc. and fill state.queue with music to schedule.
    function fillQueue(): void {
        // Allowed time signatures, as n/8
        const timeSignatures: NonEmptyArray<number> = [5, 6, 7, 8, 9, 11, 13];
        state.rhythm.generateNewSubdivision(Random.fromArray(timeSignatures));
        // Query all greek modes (only one imperfection) with a perfect fifth
        // above the tonic
        const query: ScaleQuery = {
            chord: 1 << 7,
            imperfections: [1, 1]
        };
        const matchingScales = Scales.getAllScalesMatchingQuery(query);
        if (Arrays.isNonEmpty(matchingScales)) {
            state.scale = Random.fromArray(matchingScales);
        }
        state.drumLoop = generateDrumLoop();
        state.progression = generateChordProgression(state.scale, state.root);
        state.queue = [
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.CHORDS, MeasureContents.DRUMS],
            [MeasureContents.DRUMS]
        ];
    }

    function queueChord(startingTime: number): void {
        const curChord = state.progression[mod(state.chordIndex, state.progression.length)];
        const beatLength: number = 60 / state.beatsPerMinute;
        for (const val of curChord) {
            scheduleNote({
                midiNumber: octave(val, 5),
                start: startingTime,
                duration: beatLength * state.rhythm.beats
            }, instruments.pad);
        }
        state.chordIndex++;
    }

    function queueDrumLoop(startingTime: number): void {
        const beatLength: number = 60 / state.beatsPerMinute;
        let offsetTime = 0;
        for (const drum of state.drumLoop) {
            scheduleDrum(startingTime + offsetTime, drum);
            offsetTime += beatLength;
        }
    }

    function queueNextMeasure(startingTime: number): void {
        const beatLength: number = 60 / state.beatsPerMinute;
        if (state.queue.length === 0) {
            fillQueue();
        }
        const measureLength: number = beatLength * state.rhythm.beats;
        const currentContents = state.queue.shift();
        if (currentContents) {
            for (const k of currentContents) {
                switch (k) {
                case MeasureContents.DRUMS:
                    queueDrumLoop(startingTime);
                    break;
                case MeasureContents.CHORDS:
                    queueChord(startingTime);
                    break;
                default: impossible();
                }
            }
        }
        const nextMeasureStartTime: number = startingTime + measureLength;
        window.setTimeout(() => {
            queueNextMeasure(nextMeasureStartTime); // schedule next measure for after this one
            // compute next measure 100ms (0.1s) before it needs to start
        }, (nextMeasureStartTime - context.currentTime - 0.1) * 1000);
    }

    export function initialize(): void {
        masterGain.gain.value = 0.25;
        masterGain.connect(context.destination);
        queueNextMeasure(context.currentTime);
    }

    export function setVolume(volume: number): void {
        masterGain.gain.value = volume;
    }

}
