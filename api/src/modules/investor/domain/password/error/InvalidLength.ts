import { DomainClientError } from "../../../../../core/domain";

export class InvalidLength extends DomainClientError {
	constructor() {
		super(
			"INVALID_INVESTOR_PASSWORD_LENGTH",
			"Password length cannot be less than 8 characters and not greater than 32 characters.",
		);
	}
}
