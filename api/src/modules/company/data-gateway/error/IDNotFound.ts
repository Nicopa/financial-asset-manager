import { ApplicationClientError } from "../../../../core/application/error";

export class IDNotFound extends ApplicationClientError {
	constructor() {
		super("COMPANY_ID_NOT_FOUND", "Company ID not found.");
	}
}
