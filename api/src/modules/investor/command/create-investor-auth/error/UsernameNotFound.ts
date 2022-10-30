import { ApplicationClientError } from "../../../../../core/application/error";

export class UsernameNotFound extends ApplicationClientError {
	constructor(value: string) {
		super("USERNAME_NOT_FOUND", "This username was not found", value);
	}
}
