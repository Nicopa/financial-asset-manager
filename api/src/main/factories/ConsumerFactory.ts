import { AccountConsumerFactory } from "../../modules/account/factory";
import { CashFlowConsumerFactory } from "../../modules/cash-flow/factory";
import { DepositConsumerFactory } from "../../modules/deposit/factory";
import { EarningConsumerFactory } from "../../modules/earning/factory";
import { TradingConsumerFactory } from "../../modules/trading/factory";
import { WalletConsumerFactory } from "../../modules/wallet/factory";
import { WithdrawConsumerFactory } from "../../modules/withdraw/factory";
import { DataGatewayFactory } from "./DataGatewayFactory";
import { ProviderFactory } from "./ProviderFactory";
import { RepositoryFactory } from "./RepositoryFactory";

export class ConsumerFactory {
	public readonly account: AccountConsumerFactory;
	public readonly cashFlow: CashFlowConsumerFactory;
	public readonly deposit: DepositConsumerFactory;
	public readonly earning: EarningConsumerFactory;
	public readonly trading: TradingConsumerFactory;
	public readonly wallet: WalletConsumerFactory;
	public readonly withdraw: WithdrawConsumerFactory;
	constructor(
		private readonly repositoryFactory: RepositoryFactory,
		private readonly dataGatewayFactory: DataGatewayFactory,
		private readonly providerFactory: ProviderFactory,
	) {
		this.account = new AccountConsumerFactory(
			repositoryFactory.accountRepository,
		);
		this.cashFlow = new CashFlowConsumerFactory(
			dataGatewayFactory.cashFlowDataGateway,
			dataGatewayFactory.companyDataGateway,
		);
		this.deposit = new DepositConsumerFactory(
			dataGatewayFactory.depositDataGateway,
		);
		this.earning = new EarningConsumerFactory(
			dataGatewayFactory.earningDataGateway,
			dataGatewayFactory.companyDataGateway,
			dataGatewayFactory.assetDataGateway,
		);
		this.trading = new TradingConsumerFactory(
			dataGatewayFactory.tradingDataGateway,
			dataGatewayFactory.companyDataGateway,
			dataGatewayFactory.assetDataGateway,
		);
		this.wallet = new WalletConsumerFactory(
			this.repositoryFactory.walletRepository,
			this.providerFactory.uUIDProvider,
		);
		this.withdraw = new WithdrawConsumerFactory(
			dataGatewayFactory.withdrawDataGateway,
		);
	}
}
