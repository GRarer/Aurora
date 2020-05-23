import Cost from "./Cost.js";
import { NonEmptyArray } from "../util/Arrays.js";
import { Schemas as S } from "@nprindle/augustus";

/* a conversion from input resources to output resources that a tile can perform between turns if the conversion's
 * input resources are available
 */
export default class Conversion {

    public enabled: boolean = true; // conversion will be skipped when disabled

    private constructor(
        public readonly inputs: Cost[],
        public readonly outputs: NonEmptyArray<Cost>,
        public readonly requiredWorkers: number,

        /* Conversions are sorted by priority to determine the order in which
         * conversions are applied. Lower numbered conversions are applied first
         * if a priority is not set in the constructor, it will be assigned a priority number when placed into a world
         */
        public priority?: number,
    ) {}

    static newConversion(inputs: Cost[], outputs: NonEmptyArray<Cost>, requiredWorkers: number = 0): Conversion {
        return new Conversion(inputs, outputs, requiredWorkers, undefined);
    }

    isFree(): boolean {
        return this.inputs.length === 0 && this.requiredWorkers === 0;
    }

    toString(): string {
        const outputDescription = this.outputs.map(output => output.toString()).join(", ");
        if (this.isFree()) {
            return `Produce ${outputDescription}`;
        } else {
            const inputStrings = this.inputs.map(cost => cost.toString());
            if (this.requiredWorkers !== 0) {
                inputStrings.push(`${this.requiredWorkers} workers`);
            }
            const inputDescription = inputStrings.join(", ");
            return `Produce ${outputDescription} using ${inputDescription}`;
        }
    }

    static readonly schema = S.contra(
        S.recordOf({
            priority: S.aNumber,
            enabled: S.aBoolean,
            inputs: S.arrayOf(Cost.schema),
            outputs: S.nonEmptyArrayOf(Cost.schema),
            requiredWorkers: S.aNumber,
        }),
        (c: Conversion) => ({
            priority: c.priority,
            enabled: c.enabled,
            inputs: c.inputs,
            outputs: c.outputs,
            requiredWorkers: c.requiredWorkers
        }),
        ({ priority, enabled, inputs, outputs, requiredWorkers }) => {
            const conversion = new Conversion(inputs, outputs, requiredWorkers, priority);
            conversion.enabled = enabled;
            return conversion;
        },
    );
}
