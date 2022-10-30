import { ApplicationClientError } from "../../../../core/application/error";

export class IDNotFound extends ApplicationClientError {
	constructor() {
		super("BROKER_ID_NOT_FOUND", "Broker ID not found.");
	}
}
