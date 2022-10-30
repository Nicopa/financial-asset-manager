import { Knex } from "knex";
import mongoose from "mongoose";
import { ExpressHTTP } from "../modules/http/express";
import {
	ConsumerFactory,
	DataGatewayFactory,
	HTTPControllerFactory,
	ProviderFactory,
	RepositoryFactory,
} from "./factories";
import { RoutinesFactory } from "./factories/RoutinesFactory";

export class Server {
	public readonly http: ExpressHTTP;
	public readonly routinesFactory: RoutinesFactory;
	constructor(
		private knexConnection: Knex<any, unknown[]>,
		private mongoConnection: mongoose.Connection,
	) {
		this.http = new ExpressHTTP();
		const providerFactory = new ProviderFactory();
		const dataGatewayFactory = new DataGatewayFactory(
			this.knexConnection,
			this.mongoConnection,
		);
		const repositoryFactory = new RepositoryFactory(this.knexConnection);
		const httpControllerFactory = new HTTPControllerFactory(
			repositoryFactory,
			dataGatewayFactory,
			providerFactory,
		);
		const consumerFactory = new ConsumerFactory(
			repositoryFactory,
			dataGatewayFactory,
			providerFactory,
		);
		this.routinesFactory = new RoutinesFactory(
			dataGatewayFactory,
			providerFactory,
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.account.makeCashFlowCreatedAccountConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.account.makeCashFlowDeletedAccountConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.cashFlow.makeCashFlowCreatedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.cashFlow.makeCashFlowDeletedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.deposit.makeDepositCreatedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.earning.makeEarningCreatedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.earning.makeEarningDeletedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.deposit.makeDepositDeletedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.withdraw.makeWithdrawCreatedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.withdraw.makeWithdrawDeletedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.trading.makeTradingCreatedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.trading.makeTradingDeletedConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.wallet.makeInvestorCreatedWalletConsumer(),
		);
		providerFactory.eventBroker.subscribe(
			consumerFactory.wallet.makeTradingCreatedWalletConsumer(),
		);
		/* providerFactory.eventBroker.subscribe(
			consumerFactory.wallet.makeTradingDeletedWalletConsumer(),
		); */
		this.http.on(
			"post",
			"/signup",
			httpControllerFactory.investor.makeCreateInvestorController(),
		);
		this.http.on(
			"post",
			"/login",
			httpControllerFactory.investor.makeCreateInvestorAuthController(),
		);
		this.http.on(
			"get",
			"/investor",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.investor.makeGetInvestor(),
		);
		this.http.on(
			"get",
			"/brokers/available",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.broker.makeGetBrokersForInvestorAccountController(),
		);
		this.http.on(
			"post",
			"/account",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.account.makeCreateAccountController(),
		);
		this.http.on(
			"post",
			"/deposit",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.deposit.makeCreateDepositController(),
		);
		this.http.on(
			"delete",
			"/deposit/:id",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.deposit.makeDeleteDepositController(),
		);
		this.http.on(
			"post",
			"/withdraw",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.withdraw.makeCreateWithdrawController(),
		);
		this.http.on(
			"delete",
			"/withdraw/:id",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.withdraw.makeDeleteWithdrawController(),
		);
		this.http.on(
			"get",
			"/bdrs",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.bdr.makeGetBDRsController(),
		);
		this.http.on(
			"get",
			"/brazilian-stocks",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.brazilianStock.makeGetBrazilianStocksController(),
		);
		this.http.on(
			"post",
			"/trading",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.trading.makeCreateTradingController(),
		);
		this.http.on(
			"delete",
			"/trading/:id",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.trading.makeDeleteTradingController(),
		);
		this.http.on(
			"get",
			"/cash-flows",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.cashFlow.makeGetCashFlowsController(),
		);
		this.http.on(
			"get",
			"/accounts",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.account.makeGetAccountsController(),
		);
		this.http.on(
			"get",
			"/tradings",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.trading.makeGetTradingsController(),
		);
		this.http.on(
			"get",
			"/assets",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.asset.makeGetAssetsByNameController(),
		);
		this.http.on(
			"get",
			"/etfs",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.etf.makeGetETFsController(),
		);
		this.http.on(
			"get",
			"/wallet",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.wallet.makeGetWalletController(),
		);
		this.http.on(
			"get",
			"/wallet/pie-data",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.wallet.makeGetWalletPieDataController(),
		);
		this.http.on(
			"post",
			"/earning",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.earning.makeCreateEarningController(),
		);
		this.http.on(
			"delete",
			"/earning/:id",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.earning.makeDeleteEarningController(),
		);
		this.http.on(
			"get",
			"/earnings",
			httpControllerFactory.investor.makeGetInvestorAuthController(),
			httpControllerFactory.earning.makeGetEarningsController(),
		);
	}
	async start(port?: number) {
		this.routinesFactory.assetRoutines.updateLastPrices.start();
		return this.http.listen(port);
	}
}
