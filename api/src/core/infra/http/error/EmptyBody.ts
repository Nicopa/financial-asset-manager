import { InfrastructureClientError } from "../../error";

export class EmptyBody extends InfrastructureClientError {
	constructor(value: string[]) {
		super(
			"EMPTY_BODY",
			"This request expects some body parameters",
			value.join(",\n"),
		);
	}
}
