import { Account } from "../domain";
import { AccountIDType } from "../domain/id";

export interface AccountRepository {
	add(account: Account): Promise<void>;
	getByID(accountID: AccountIDType): Promise<Account>;
	findByID(accountID: AccountIDType): Promise<Account | undefined>;
	update(account: Account): Promise<void>;
}
