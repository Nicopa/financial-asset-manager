import { AggregateRoot } from "../../../core/domain";
import { Currency } from "../../money/domain";
import { AccountCreated } from "./event";
import { AccountID, AccountIDType } from "./id";

export interface AccountState {
	BRLbalance: number;
	USDbalance: number;
}
export type AccountLoadParams = {
	id: AccountIDType;
	BRLbalance?: number;
	USDbalance?: number;
};
export type AccountCreateParams = AccountLoadParams;
export class Account extends AggregateRoot<AccountIDType, AccountState> {
	constructor(id: AccountID, state: AccountState) {
		super(id, state);
	}
	public updateBalance(
		operation: "IN" | "OUT",
		currency: Currency,
		amount: number,
	) {
		if (operation === "IN") this.state[`${currency}balance`] += amount;
		else this.state[`${currency}balance`] -= amount;
	}
	public static create(params: AccountCreateParams): Account {
		const account = new Account(AccountID.create(params.id), {
			BRLbalance: params.BRLbalance || 0,
			USDbalance: params.USDbalance || 0,
		});
		account.addDomainEvent(
			new AccountCreated({
				account: {
					id: account.id.value,
					BRLbalance: account.state.BRLbalance,
					USDbalance: account.state.USDbalance,
				},
			}),
		);
		return account;
	}
	public static load(params: AccountLoadParams) {
		return new Account(AccountID.load(params.id), {
			BRLbalance: params.BRLbalance || 0,
			USDbalance: params.USDbalance || 0,
		});
	}
}
