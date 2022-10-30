import { ApplicationClientError } from "../../../../core/application/error";

export class InvestorNotFound extends ApplicationClientError {
	constructor() {
		super("INVESTOR_NOT_FOUND", "Investor not found.");
	}
}
