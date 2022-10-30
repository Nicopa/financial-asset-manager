import { ApplicationClientError } from "../../../../../core/application/error";

export class IncorrectPassword extends ApplicationClientError {
	constructor() {
		super("INCORRECT_PASSWORD", "The provided password is not correct.");
	}
}
