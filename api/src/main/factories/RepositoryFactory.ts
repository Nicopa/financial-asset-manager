import { Knex } from "knex";
import {
	AccountKnexRepository,
	AccountRepository,
} from "../../modules/account/repository";
import {
	AssetKnexRepository,
	AssetRepository,
} from "../../modules/asset/repository";
import {
	DepositKnexRepository,
	DepositRepository,
} from "../../modules/deposit/repository";
import {
	EarningKnexRepository,
	EarningRepository,
} from "../../modules/earning/repository";
import {
	InvestorKnexRepository,
	InvestorRepository,
} from "../../modules/investor/repository";
import {
	TradingKnexRepository,
	TradingRepository,
} from "../../modules/trading/repository";
import {
	WalletKnexRepository,
	WalletRepository,
} from "../../modules/wallet/repository";
import {
	WithdrawKnexRepository,
	WithdrawRepository,
} from "../../modules/withdraw/repository";

export class RepositoryFactory {
	public readonly accountRepository: AccountRepository;
	public readonly assetRepository: AssetRepository;
	public readonly depositRepository: DepositRepository;
	public readonly earningRepository: EarningRepository;
	public readonly investorRepository: InvestorRepository;
	public readonly tradingRepository: TradingRepository;
	public readonly walletRepository: WalletRepository;
	public readonly withdrawRepository: WithdrawRepository;
	constructor(knexConnection: Knex) {
		this.accountRepository = new AccountKnexRepository(knexConnection);
		this.assetRepository = new AssetKnexRepository(knexConnection);
		this.depositRepository = new DepositKnexRepository(knexConnection);
		this.earningRepository = new EarningKnexRepository(knexConnection);
		this.investorRepository = new InvestorKnexRepository(knexConnection);
		this.tradingRepository = new TradingKnexRepository(knexConnection);
		this.walletRepository = new WalletKnexRepository(knexConnection);
		this.withdrawRepository = new WithdrawKnexRepository(knexConnection);
	}
}
