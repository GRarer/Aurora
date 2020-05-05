import Resource from "./Resource";
import { Schemas as S } from "@nprindle/augustus";

export default class Cost {
    constructor(
        public resource: Resource,
        public quantity: number
    ) {}

    toString(): string {
        return `${this.resource.name} x${this.quantity}`;
    }

    static readonly schema = S.classOf({
        resource: Resource.schema,
        quantity: S.aNumber,
    }, ({ resource, quantity }) => new Cost(resource, quantity));
}
