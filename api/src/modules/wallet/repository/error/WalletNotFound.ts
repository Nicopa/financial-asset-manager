import { ApplicationClientError } from "../../../../core/application/error";

export class WalletNotFound extends ApplicationClientError {
	constructor() {
		super("WALLET_NOT_FOUND", "Wallet not found.");
	}
}
