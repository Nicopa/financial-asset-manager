import { Knex } from "knex";
import mongoose from "mongoose";
import {
	AccountDataGateway,
	AccountKnexDataGateway,
} from "../../modules/account/data-gateway";
import {
	AssetDataGateway,
	AssetKnexDataGateway,
} from "../../modules/asset/data-gateway";
import {
	BDRDataGateway,
	BDRKnexDataGateway,
} from "../../modules/brazilian-depositary-receipt/data-gateway";
import {
	BrazilianStockDataGateway,
	BrazilianStockKnexDataGateway,
} from "../../modules/brazilian-stock/data-gateway";
import {
	BrokerDataGateway,
	BrokerKnexDataGateway,
} from "../../modules/broker/data-gateway";
import {
	CashFlowDataGateway,
	CashFlowMongoDataGateway,
} from "../../modules/cash-flow/data-gateway";
import {
	CDBDataGateway,
	CDBKnexDataGateway,
} from "../../modules/cdb/data-gateway";
import {
	CompanyDataGateway,
	CompanyKnexDataGateway,
} from "../../modules/company/data-gateway";
import {
	DepositDataGateway,
	DepositMongoDataGateway,
} from "../../modules/deposit/data-gateway";
import {
	EarningDataGateway,
	EarningMongoDataGateway,
} from "../../modules/earning/data-gateway";
import {
	ETFDataGateway,
	ETFKnexDataGateway,
} from "../../modules/etf/data-gateway";
import {
	InvestorDataGateway,
	InvestorKnexDataGateway,
} from "../../modules/investor/data-gateway";
import {
	TradingDataGateway,
	TradingMongoDataGateway,
} from "../../modules/trading/data-gateway";
import { WalletDataGateway } from "../../modules/wallet/data-gateway/WalletDataGateway";
import { WalletKnexDataGateway } from "../../modules/wallet/data-gateway/WalletKnexDataGateway";
import {
	WithdrawDataGateway,
	WithdrawMongoDataGateway,
} from "../../modules/withdraw/data-gateway";

export class DataGatewayFactory {
	public readonly assetDataGateway: AssetDataGateway;
	public readonly accountDataGateway: AccountDataGateway;
	public readonly bdrDataGateway: BDRDataGateway;
	public readonly brazilianStockDataGateway: BrazilianStockDataGateway;
	public readonly brokerDataGateway: BrokerDataGateway;
	public readonly cashFlowDataGateway: CashFlowDataGateway;
	public readonly cdbDataGateway: CDBDataGateway;
	public readonly companyDataGateway: CompanyDataGateway;
	public readonly depositDataGateway: DepositDataGateway;
	public readonly earningDataGateway: EarningDataGateway;
	public readonly etfDataGateway: ETFDataGateway;
	public readonly investorDataGateway: InvestorDataGateway;
	public readonly tradingDataGateway: TradingDataGateway;
	public readonly walletDataGateway: WalletDataGateway;
	public readonly withdrawDataGateway: WithdrawDataGateway;
	constructor(knexConnection: Knex, mongoConnection: mongoose.Connection) {
		this.assetDataGateway = new AssetKnexDataGateway(knexConnection);
		this.accountDataGateway = new AccountKnexDataGateway(knexConnection);
		this.bdrDataGateway = new BDRKnexDataGateway(knexConnection);
		this.brazilianStockDataGateway = new BrazilianStockKnexDataGateway(
			knexConnection,
		);
		this.brokerDataGateway = new BrokerKnexDataGateway(knexConnection);
		this.cashFlowDataGateway = new CashFlowMongoDataGateway(mongoConnection);
		this.cdbDataGateway = new CDBKnexDataGateway(knexConnection);
		this.companyDataGateway = new CompanyKnexDataGateway(knexConnection);
		this.depositDataGateway = new DepositMongoDataGateway(mongoConnection);
		this.earningDataGateway = new EarningMongoDataGateway(mongoConnection);
		this.etfDataGateway = new ETFKnexDataGateway(knexConnection);
		this.investorDataGateway = new InvestorKnexDataGateway(knexConnection);
		this.tradingDataGateway = new TradingMongoDataGateway(mongoConnection);
		this.walletDataGateway = new WalletKnexDataGateway(knexConnection);
		this.withdrawDataGateway = new WithdrawMongoDataGateway(mongoConnection);
	}
}
