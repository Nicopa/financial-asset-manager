import { ApplicationClientError } from "../../../../core/application/error";

export class ExpiredToken extends ApplicationClientError {
	constructor(message: string, expirationDate: string) {
		super("EXPIRED_TOKEN", message.trim(), expirationDate);
	}
}
