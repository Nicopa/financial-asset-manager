import { ApplicationClientError } from "../../../../core/application/error";

export class DepositNotFound extends ApplicationClientError {
	constructor() {
		super("DEPOSIT_NOT_FOUND", "Deposit not found.");
	}
}
