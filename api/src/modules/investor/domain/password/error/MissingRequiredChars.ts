import { DomainClientError } from "../../../../../core/domain";

export class MissingRequiredChars extends DomainClientError {
	constructor() {
		super(
			"INVALID_INVESTOR_PASSWORD_CHARACTERS",
			"Invalid Password: the password must have at least one lower and upper case letter, one number and some of the following characters: !@#$%&*.-_+",
		);
	}
}
