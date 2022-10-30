import { ApplicationClientError } from "../../../../core/application/error";

export class NoTokenProvided extends ApplicationClientError {
	constructor(message: string) {
		super("UNAUTHORIZED_NO_TOKEN_PROVIDED", `Unauthorized: ${message.trim()}`);
	}
}
