import { ApplicationClientError } from "../../../../core/application/error";

export class TradingNotFound extends ApplicationClientError {
	constructor() {
		super("TRADING_NOT_FOUND", "Trading not found.");
	}
}
