import { AssetDataGateway } from "../../asset/data-gateway";
import { CompanyDataGateway } from "../../company/data-gateway";
import { TradingCreatedConsumer } from "../consumer/trading-created";
import { TradingDeletedConsumer } from "../consumer/trading-deleted";
import { TradingDataGateway } from "../data-gateway";

export class TradingConsumerFactory {
	constructor(
		private readonly tradingDataGateway: TradingDataGateway,
		private readonly companyDataGateway: CompanyDataGateway,
		private readonly assetDataGateway: AssetDataGateway,
	) {}
	public makeTradingCreatedConsumer() {
		return new TradingCreatedConsumer(
			this.tradingDataGateway,
			this.companyDataGateway,
			this.assetDataGateway,
		);
	}
	public makeTradingDeletedConsumer() {
		return new TradingDeletedConsumer(this.tradingDataGateway);
	}
}
