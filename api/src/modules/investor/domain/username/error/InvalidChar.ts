import { DomainClientError } from "../../../../../core/domain";

export class InvalidChar extends DomainClientError {
	constructor(value: string) {
		super(
			"INVALID_INVESTOR_USERNAME_CHARACTERS",
			"Username should have only letters, numbers and the following characters: !@#$%&*-_.+=",
			value,
		);
	}
}
