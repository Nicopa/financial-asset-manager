import { QuoteProvider } from "../../quote/provider";
import { AssetDataGateway } from "../data-gateway";
import { UpdateLastPrices } from "../routine/update-last-prices";

export class AssetRoutinesFactory {
	public readonly updateLastPrices: UpdateLastPrices;
	constructor(
		private readonly assetDataGateway: AssetDataGateway,
		private readonly assetQuoteProvider: QuoteProvider,
	) {
		this.updateLastPrices = new UpdateLastPrices(
			this.assetDataGateway,
			this.assetQuoteProvider,
		);
	}
}
