import { InfrastructureClientError } from "../../error";

export class MissingField extends InfrastructureClientError {
	constructor(value: string) {
		super("MISSING_FIELD", `The following field is missing: ${value}`);
	}
}
