import { ApplicationClientError } from "../../../../core/application/error";

export class EarningNotFound extends ApplicationClientError {
	constructor() {
		super("EARNING_NOT_FOUND", "Earning not found.");
	}
}
