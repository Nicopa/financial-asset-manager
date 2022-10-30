import { DomainClientError } from "../../../../../core/domain";

export class InvalidType extends DomainClientError {
	constructor(value: string) {
		super(
			"INVALID_EARNING_TYPE",
			"The provided earning type doesn't exist.",
			value,
		);
	}
}
