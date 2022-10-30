import { DomainClientError } from "../../../../../core/domain";

export class InvalidLength extends DomainClientError {
	constructor(value: string) {
		super(
			"INVALID_COMPANY_NAME_LENGTH",
			"Company name length cannot be less than 2 characters.",
			value,
		);
	}
}
