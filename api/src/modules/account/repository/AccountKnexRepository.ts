import { BrokerIDType } from "../../broker/domain/id";
import { KnexDatabase } from "../../database/knex";
import { InvestorIDType } from "../../investor/domain/id";
import { Account } from "../domain";
import { AccountIDType } from "../domain/id";
import { AccountRepository } from "./AccountRepository";
import { AccountNotFound } from "./error";

type AccountDataMap = {
	investorID: InvestorIDType;
	brokerID: BrokerIDType;
	BRLbalance?: number;
	USDbalance?: number;
};
export class AccountKnexRepository
	extends KnexDatabase
	implements AccountRepository
{
	public static readonly accountTableName = "accounts";
	private toPersistence(account: Account): AccountDataMap {
		return {
			investorID: account.id.value.investorID,
			brokerID: account.id.value.brokerID,
			BRLbalance: account.state.BRLbalance,
			USDbalance: account.state.USDbalance,
		};
	}
	private toDomain({
		investorID,
		brokerID,
		BRLbalance,
		USDbalance,
	}: AccountDataMap): Account {
		return Account.load({
			id: {
				investorID,
				brokerID,
			},
			BRLbalance,
			USDbalance,
		});
	}
	async add(account: Account): Promise<void> {
		const data = this.toPersistence(account);
		await this.database
			.insert(data)
			.into(AccountKnexRepository.accountTableName);
	}
	async getByID(id: AccountIDType): Promise<Account> {
		const account = await this.findByID(id);
		if (!account) throw new AccountNotFound();
		return account;
	}
	async findByID({
		investorID,
		brokerID,
	}: AccountIDType): Promise<Account | undefined> {
		const accountData = await this.database
			.from<AccountDataMap>(AccountKnexRepository.accountTableName)
			.where("investorID", investorID)
			.andWhere("brokerID", brokerID)
			.first();
		if (accountData === undefined) return undefined;
		return this.toDomain(accountData);
	}
	async update(account: Account): Promise<void> {
		const { investorID, brokerID, ...state } = this.toPersistence(account);
		await this.database(AccountKnexRepository.accountTableName)
			.where("investorID", investorID)
			.andWhere("brokerID", brokerID)
			.update(state);
	}
}
