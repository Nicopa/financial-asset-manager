import { ApplicationClientError } from "../../../../core/application/error";

export class AssetNotFound extends ApplicationClientError {
	constructor() {
		super("ASSET_NOT_FOUND", "Asset not found.");
	}
}
