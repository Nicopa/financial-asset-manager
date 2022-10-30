import { ApplicationClientError } from "../../../../core/application/error";

export class AccountNotFound extends ApplicationClientError {
	constructor() {
		super("ACCOUNT_NOT_FOUND", "Account not found.");
	}
}
