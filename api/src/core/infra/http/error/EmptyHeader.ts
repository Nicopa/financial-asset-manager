import { InfrastructureClientError } from "../../error";

export class EmptyHeader extends InfrastructureClientError {
	constructor(value: string[]) {
		super(
			"EMPTY_HEADER",
			"This request expects some header parameters",
			value.join(",\n"),
		);
	}
}
