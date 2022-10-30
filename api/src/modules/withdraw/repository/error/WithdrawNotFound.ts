import { ApplicationClientError } from "../../../../core/application/error";

export class WithdrawNotFound extends ApplicationClientError {
	constructor() {
		super("WITHDRAW_NOT_FOUND", "Withdraw not found.");
	}
}
