import { Note } from "./Notes.js";
import Instrument from "./Instrument.js";
import { AdsrOscillatorInstrument } from "./Instruments.js";
import { Random } from "../util/Random.js";
import { Scales, Scale, ScaleQuery } from "./Scales.js";
import Rhythm from "./Rhythm.js";
import { Drumkit, Drums } from "./Drums.js";
import { Arrays, NonEmptyArray } from "../util/Arrays.js";

export namespace MusicManager {

    export const context: AudioContext = new AudioContext();

    export const instruments = {
        arp: new AdsrOscillatorInstrument(
            { type: "sawtooth", detune: 3 },
            { attack: 0.01, decay: 0.05, sustain: 0.0, release: 0.1 }
        ),
        bass: new AdsrOscillatorInstrument(
            { type: "triangle", detune: 2 },
            { attack: 0.01, decay: 0.01, sustain: 1.0, release: 0.1 }
        ),
        pad: new AdsrOscillatorInstrument(
            { type: "triangle", detune: 4 },
            { attack: 1.0, decay: 0.1, sustain: 0.5, release: 0.5 }
        )
    };

    export const masterGain: GainNode = context.createGain();
    export const drumkit: Drumkit = new Drumkit();

    interface MusicState {
        beatsPerMinute: number;
        rhythm: Rhythm;
        root: number;
        scale: Scale;
    }

    const state: MusicState = {
        beatsPerMinute: 220,
        rhythm: new Rhythm(),
        root: 60, // middle C
        scale: 2741 // major
    };

    enum ChordFunction {
        TONIC = "tonic",
        SUBDOMINANT = "subdominant",
        DOMINANT = "dominant",
        AMBIGUOUS = "ambiguous"
    }

    const backHalves: NonEmptyArray<ChordFunction[]> = [
        [ChordFunction.TONIC, ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.SUBDOMINANT, ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.AMBIGUOUS, ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT],
        [ChordFunction.SUBDOMINANT, ChordFunction.DOMINANT, ChordFunction.AMBIGUOUS]
    ];

    const FunctionDegrees: Record<ChordFunction, NonEmptyArray<number>> = {
        "tonic": [0, 5], // I and VI
        "subdominant": [1, 3], // II and IV
        "dominant": [4, 6], // V and VII
        "ambiguous": [2] // III
    };

    function generateChordProgression(scale: Scale, root: number, extensions: number = 4): number[][] {
        const pitchClass: number[] = Scales.getPitchClass(scale);
        const chordDegrees: number[] = Random.fromArray(backHalves) // take one of the valid chord patterns
            // replace functions like "dominant" "subdominant" etc with degrees
            .map(f => Random.fromArray(FunctionDegrees[f]));
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
        const drumOut: AudioNode = drumkit.scheduleHit(context, start, drum);
        drumOut.connect(masterGain);
    }

    function scheduleNote(note: Note, inst: Instrument): void {
        const instOut: AudioNode = inst.scheduleNote(context, note);
        instOut.connect(masterGain);
    }

    // shift note through the octaves until it ends up between min and max
    function constrainNote(note: number, min: number, max: number): number {
        while (note < min) {
            note += 12;
        }
        while (note > max) {
            note -= 12;
        }
        return note;
    }

    function queueNextMeasures(startingTime: number): void {
        const beatLength: number = 60 / state.beatsPerMinute;
        let offsetTime: number = 0;

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

        const drumLoop: Drums[] = generateDrumLoop();
        const progression: number[][] = generateChordProgression(state.scale, state.root);
        // TODO: clean this up
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 4; i++) {
                for (const note of progression[i]) {
                    scheduleNote({
                        note: constrainNote(note, state.root, state.root + 12),
                        start: startingTime + offsetTime,
                        duration: beatLength * state.rhythm.beats
                    }, instruments.pad);
                }
                for (const drum of drumLoop) {
                    scheduleDrum(startingTime + offsetTime, drum);
                    offsetTime += beatLength;
                }
            }
        }
        for (const drum of drumLoop) {
            scheduleDrum(startingTime + offsetTime, drum);
            offsetTime += beatLength;
        }
        window.setTimeout(() => {
            queueNextMeasures(startingTime + offsetTime);
        }, (startingTime + offsetTime - context.currentTime - 0.2) * 1000);
    }

    export function initialize(): void {
        masterGain.gain.value = 0.25;
        masterGain.connect(context.destination);
        queueNextMeasures(context.currentTime);
    }

    export function setVolume(volume: number): void {
        masterGain.gain.value = volume;
    }

}
