import { Consumer } from "../../../../core/application/event";
import { TradingDeleted } from "../../../trading/domain/event";
import { WalletRepository } from "../../repository";

export class TradingDeletedWalletConsumer implements Consumer {
	eventName = "TradingDeleted";
	constructor(private readonly walletRepository: WalletRepository) {}
	async handle(domainEvent: TradingDeleted): Promise<void> {
		const tradingData = domainEvent.data;
		const wallet = await this.walletRepository.getByID(
			tradingData.accountID.investorID,
		);
		console.log(wallet.state.assets);
		wallet.delete(tradingData.id);
		console.log(wallet.state.assets);
		await this.walletRepository.update(wallet);
	}
}
