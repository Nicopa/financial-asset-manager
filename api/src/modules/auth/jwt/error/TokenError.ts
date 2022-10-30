import { ApplicationClientError } from "../../../../core/application/error";

export class TokenError extends ApplicationClientError {
	constructor(message: string) {
		super("UNAUTHORIZED_TOKEN_ERROR", `Unauthorized: ${message.trim()}`);
	}
}
