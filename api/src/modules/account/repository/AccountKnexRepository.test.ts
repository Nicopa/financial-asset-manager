import dotenv from "dotenv";
import { Knex } from "knex";
import { AccountKnexRepository } from "./AccountKnexRepository";
import { Account, AccountState } from "../domain";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("Account Knex Repository", () => {
	const inputs = {
		investorID: "7bce35a2cfa048dd93bba3029ab21903",
		brokerID: "a3e06e2a608e4e179092a3d8491c3d03",
	};
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should add a new account to the database.", async () => {
		const accountKnexRepository = new AccountKnexRepository(database);
		const fakeAccount = Account.load({
			id: inputs,
			BRLbalance: 0,
			USDbalance: 0,
		});
		expect(
			Number(
				(
					await database(AccountKnexRepository.accountTableName)
						.where("investorID", fakeAccount.id.value.investorID)
						.andWhere("brokerID", fakeAccount.id.value.brokerID)
						.count({ count: "investorID" })
						.first()
				)?.count,
			),
		).toBe(0);
		await accountKnexRepository.add(fakeAccount);
		expect(
			Number(
				(
					await database(AccountKnexRepository.accountTableName)
						.where("investorID", fakeAccount.id.value.investorID)
						.andWhere("brokerID", fakeAccount.id.value.brokerID)
						.count({ count: "investorID" })
						.first()
				)?.count,
			),
		).toBe(1);
	});
	test("It should return undefined when it doesn't find an account by ID", async () => {
		const accountKnexRepository = new AccountKnexRepository(database);
		await expect(
			accountKnexRepository.findByID({
				investorID: "anyInvestorID",
				brokerID: "anyBrokerID",
			}),
		).resolves.toBe(undefined);
	});
	test("It should find an account by ID", async () => {
		const accountKnexRepository = new AccountKnexRepository(database);
		const account = await accountKnexRepository.findByID(inputs);
		expect(account).toBeInstanceOf(Account);
		expect(account?.id.value.investorID).toBe(inputs.investorID);
		expect(account?.id.value.brokerID).toBe(inputs.brokerID);
	});
	test("It should update account data.", async () => {
		const accountKnexRepository = new AccountKnexRepository(database);
		const fakeAccount = Account.load({
			id: inputs,
			BRLbalance: 2000,
			USDbalance: -100,
		});
		await accountKnexRepository.update(fakeAccount);
		const updatedAccount = await database<AccountState>(
			AccountKnexRepository.accountTableName,
		)
			.where("investorID", fakeAccount.id.value.investorID)
			.where("brokerID", fakeAccount.id.value.brokerID)
			.first();
		expect(updatedAccount?.BRLbalance).toBe(2000);
		expect(updatedAccount?.USDbalance).toBe(-100);
	});
});
