import { ApplicationClientError } from "../../../../core/application/error";

export class IDNotFound extends ApplicationClientError {
	constructor() {
		super("CASH_FLOW_ID_NOT_FOUND", "Cash flow ID not found.");
	}
}
