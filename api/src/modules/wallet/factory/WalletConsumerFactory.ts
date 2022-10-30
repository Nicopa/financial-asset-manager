import { UUIDProvider } from "../../../core/domain/service/uuid";
import { InvestorCreatedWalletConsumer } from "../consumer/investor-created";
import { TradingCreatedWalletConsumer } from "../consumer/trading-created";
import { TradingDeletedWalletConsumer } from "../consumer/trading-deleted";
import { WalletRepository } from "../repository";

export class WalletConsumerFactory {
	constructor(
		private readonly walletRepository: WalletRepository,
		private readonly uUIDProvider: UUIDProvider,
	) {}
	public makeInvestorCreatedWalletConsumer() {
		return new InvestorCreatedWalletConsumer(this.walletRepository);
	}
	public makeTradingCreatedWalletConsumer() {
		return new TradingCreatedWalletConsumer(
			this.walletRepository,
			this.uUIDProvider,
		);
	}
	public makeTradingDeletedWalletConsumer() {
		return new TradingDeletedWalletConsumer(this.walletRepository);
	}
}
