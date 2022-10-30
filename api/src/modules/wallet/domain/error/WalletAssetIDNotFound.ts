import { DomainClientError } from "../../../../core/domain";

export class WalletAssetIDNotFound extends DomainClientError {
	constructor() {
		super("WALLET_ASSET_ID_NOT_FOUND", "Wallet Asset ID not found.");
	}
}
