import { ApplicationClientError } from "../../../../core/application/error";

export class BadFormatted extends ApplicationClientError {
	constructor(message: string) {
		super("UNAUTHORIZED_BAD_FORMATTED", `Unauthorized: ${message.trim()}`);
	}
}
