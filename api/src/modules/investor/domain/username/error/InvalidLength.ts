import { DomainClientError } from "../../../../../core/domain";

export class InvalidLength extends DomainClientError {
	constructor(value: string) {
		super(
			"INVALID_INVESTOR_USERNAME_LENGTH",
			"Username length cannot be less than 4 characters.",
			value,
		);
	}
}
