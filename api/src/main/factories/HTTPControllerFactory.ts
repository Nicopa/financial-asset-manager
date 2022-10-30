import { DataGatewayFactory } from "./DataGatewayFactory";
import { ProviderFactory } from "./ProviderFactory";
import { RepositoryFactory } from "./RepositoryFactory";
import { InvestorHTTPControllerFactory } from "../../modules/investor/factory";
import { AccountHTTPControllerFactory } from "../../modules/account/factory";
import { DepositHTTPControllerFactory } from "../../modules/deposit/factory";
import { WithdrawHTTPControllerFactory } from "../../modules/withdraw/factory";
import { BrazilianStockHTTPControllerFactory } from "../../modules/brazilian-stock/factory";
import { BrokerHTTPControllerFactory } from "../../modules/broker/factory";
import { TradingHTTPControllerFactory } from "../../modules/trading/factory";
import { CashFlowHTTPControllerFactory } from "../../modules/cash-flow/factory";
import { AssetHTTPControllerFactory } from "../../modules/asset/factory";
import { BDRHTTPControllerFactory } from "../../modules/brazilian-depositary-receipt/factory";
import { ETFHTTPControllerFactory } from "../../modules/etf/factory";
import { WalletHTTPControllerFactory } from "../../modules/wallet/factory";
import { EarningHTTPControllerFactory } from "../../modules/earning/factory";

export class HTTPControllerFactory {
	public readonly account: AccountHTTPControllerFactory;
	public readonly asset: AssetHTTPControllerFactory;
	public readonly bdr: BDRHTTPControllerFactory;
	public readonly brazilianStock: BrazilianStockHTTPControllerFactory;
	public readonly broker: BrokerHTTPControllerFactory;
	public readonly cashFlow: CashFlowHTTPControllerFactory;
	public readonly deposit: DepositHTTPControllerFactory;
	public readonly earning: EarningHTTPControllerFactory;
	public readonly etf: ETFHTTPControllerFactory;
	public readonly investor: InvestorHTTPControllerFactory;
	public readonly trading: TradingHTTPControllerFactory;
	public readonly wallet: WalletHTTPControllerFactory;
	public readonly withdraw: WithdrawHTTPControllerFactory;
	constructor(
		private readonly repositoryFactory: RepositoryFactory,
		private readonly dataGatewayFactory: DataGatewayFactory,
		private readonly providerFactory: ProviderFactory,
	) {
		this.account = new AccountHTTPControllerFactory(
			this.repositoryFactory.accountRepository,
			this.dataGatewayFactory.accountDataGateway,
			this.providerFactory.eventBroker,
		);
		this.asset = new AssetHTTPControllerFactory(
			this.dataGatewayFactory.assetDataGateway,
		);
		this.bdr = new BDRHTTPControllerFactory(
			this.dataGatewayFactory.bdrDataGateway,
		);
		this.brazilianStock = new BrazilianStockHTTPControllerFactory(
			this.dataGatewayFactory.brazilianStockDataGateway,
		);
		this.broker = new BrokerHTTPControllerFactory(
			this.dataGatewayFactory.brokerDataGateway,
		);
		this.cashFlow = new CashFlowHTTPControllerFactory(
			this.dataGatewayFactory.cashFlowDataGateway,
		);
		this.deposit = new DepositHTTPControllerFactory(
			this.repositoryFactory.depositRepository,
			this.repositoryFactory.accountRepository,
			this.providerFactory.uUIDProvider,
			this.providerFactory.eventBroker,
		);
		this.earning = new EarningHTTPControllerFactory(
			this.repositoryFactory.earningRepository,
			this.repositoryFactory.accountRepository,
			this.dataGatewayFactory.earningDataGateway,
			this.providerFactory.uUIDProvider,
			this.providerFactory.eventBroker,
		);
		this.etf = new ETFHTTPControllerFactory(
			this.dataGatewayFactory.etfDataGateway,
		);
		this.investor = new InvestorHTTPControllerFactory(
			this.repositoryFactory.investorRepository,
			this.dataGatewayFactory.investorDataGateway,
			this.providerFactory.eventBroker,
			this.providerFactory.uUIDProvider,
			this.providerFactory.encryption,
			this.providerFactory.authProvider,
		);
		this.trading = new TradingHTTPControllerFactory(
			this.repositoryFactory.tradingRepository,
			this.repositoryFactory.accountRepository,
			this.repositoryFactory.assetRepository,
			this.repositoryFactory.walletRepository,
			this.dataGatewayFactory.tradingDataGateway,
			this.providerFactory.eventBroker,
			this.providerFactory.uUIDProvider,
		);
		this.wallet = new WalletHTTPControllerFactory(
			this.dataGatewayFactory.walletDataGateway,
			this.dataGatewayFactory.cdbDataGateway,
			this.dataGatewayFactory.accountDataGateway,
		);
		this.withdraw = new WithdrawHTTPControllerFactory(
			this.repositoryFactory.withdrawRepository,
			this.repositoryFactory.accountRepository,
			this.providerFactory.uUIDProvider,
			this.providerFactory.eventBroker,
		);
	}
}
