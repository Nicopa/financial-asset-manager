import { ApplicationClientError } from "../../../../../core/application/error";

export class UsernameAlreadyExists extends ApplicationClientError {
	constructor(value: string) {
		super(
			"INVESTOR_USERNAME_ALREADY_EXISTS",
			"This username already exists.",
			value,
		);
	}
}
