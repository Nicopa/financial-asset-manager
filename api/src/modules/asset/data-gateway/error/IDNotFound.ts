import { ApplicationClientError } from "../../../../core/application/error";

export class IDNotFound extends ApplicationClientError {
	constructor(id: string) {
		super("ASSET_ID_NOT_FOUND", "Asset ID not found.", id);
	}
}
