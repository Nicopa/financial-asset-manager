import { DomainClientError } from "../../../../../core/domain";

export class InvalidAssetID extends DomainClientError {
	constructor() {
		super(
			"INVALID_ASSET_ID",
			"Asset ID should be equal to the wallet asset that is being added to.",
		);
	}
}
