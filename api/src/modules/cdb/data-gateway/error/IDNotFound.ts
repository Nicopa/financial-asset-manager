import { ApplicationClientError } from "../../../../core/application/error";

export class IDNotFound extends ApplicationClientError {
	constructor() {
		super("CDB_ID_NOT_FOUND", "CDB ID not found.");
	}
}
