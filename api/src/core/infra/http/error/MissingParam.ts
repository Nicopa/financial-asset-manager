import { InfrastructureClientError } from "../../error";

export class MissingParam extends InfrastructureClientError {
	constructor(value: string) {
		super("MISSING_PARAMETER", `The following parameter is missing: ${value}`);
	}
}
