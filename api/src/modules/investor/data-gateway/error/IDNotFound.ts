import { ApplicationClientError } from "../../../../core/application/error";

export class IDNotFound extends ApplicationClientError {
	constructor() {
		super("INVESTOR_ID_NOT_FOUND", "Investor ID not found.");
	}
}
