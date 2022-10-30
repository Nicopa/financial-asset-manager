import { Routine } from "../../../../core/infra";
import { QuoteProvider } from "../../../quote/provider";
import { AssetDataGateway } from "../../data-gateway";

export class UpdateLastPrices implements Routine {
	private timeInterval: number = 10000;
	constructor(
		private readonly assetDataGateway: AssetDataGateway,
		private readonly assetQuoteProvider: QuoteProvider,
	) {}
	async execute(): Promise<void> {
		const assets = await this.assetDataGateway.getAll();
		for (const asset of assets) {
			if (
				asset.updatedAt <
				new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					new Date().getDate(),
				)
			) {
				if (
					asset.type === "BRAZILIAN_STOCK" ||
					asset.type === "BRAZILIAN_DEPOSITARY_RECEIPT" ||
					asset.type === "BRAZILIAN_ETF" ||
					asset.type === "BRAZILIAN_REAL_ESTATE"
				) {
					const lastPrice = await this.assetQuoteProvider.get(asset.name);
					console.log("Updating last price for: " + asset.name, lastPrice);
					if (!lastPrice)
						await this.assetDataGateway.updateLastPrice(
							asset.id,
							asset.lastPrice,
						);
					else await this.assetDataGateway.updateLastPrice(asset.id, lastPrice);
				}
			}
		}
	}
	start(): void {
		setInterval(() => {
			this.execute();
		}, this.timeInterval);
	}
}
