import { Consumer } from "../../../../core/application/event";
import { UUIDProvider } from "../../../../core/domain/service/uuid";
import { TradingCreated } from "../../../trading/domain/event";
import { WalletRepository } from "../../repository";

export class TradingCreatedWalletConsumer implements Consumer {
	eventName = "TradingCreated";
	constructor(
		private readonly walletRepository: WalletRepository,
		private readonly uUIDProvider: UUIDProvider,
	) {}
	async handle(domainEvent: TradingCreated): Promise<void> {
		const tradingData = domainEvent.data;
		const wallet = await this.walletRepository.getByID(
			tradingData.accountID.investorID,
		);
		wallet.add(
			{
				assetID: tradingData.assetID,
				sourceTradingID: tradingData.id,
				quantity: tradingData.quantity,
				operationDate: tradingData.operationDate,
				currency: tradingData.grossTotal.currency,
				acquisitionTotalAmount:
					tradingData.operation === "ACQUISITION"
						? tradingData.netTotal
						: undefined,
				disposalTotalAmount:
					tradingData.operation === "DISPOSAL"
						? tradingData.netTotal
						: undefined,
			},
			this.uUIDProvider,
		);
		await this.walletRepository.update(wallet);
	}
}
