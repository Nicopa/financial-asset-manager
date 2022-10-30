import { Account, AccountCreateParams } from "./Account";

describe("[account] Account", () => {
	const validAccountCreateParams: AccountCreateParams = {
		id: {
			investorID: "investorid",
			brokerID: "brokerid",
		},
	};
	test("It should return an account object if created with valid data.", () => {
		expect(Account.create(validAccountCreateParams)).toBeInstanceOf(Account);
	});
	test("It should create a domain event when created.", () => {
		const account = Account.create(validAccountCreateParams);
		expect(account.dispatchEvents().length).toBe(1);
	});
	test("It should update balance for a giver operation, currency and amount", () => {
		const account = Account.load(validAccountCreateParams);
		expect(account.state.BRLbalance).toBe(0);
		expect(account.state.USDbalance).toBe(0);
		account.updateBalance("IN", "BRL", 100);
		account.updateBalance("OUT", "USD", 200);
		expect(account.state.BRLbalance).toBe(100);
		expect(account.state.USDbalance).toBe(-200);
	});
});
