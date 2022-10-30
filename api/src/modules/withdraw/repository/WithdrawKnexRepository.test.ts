import { Knex } from "knex";
import { WithdrawKnexRepository } from "./WithdrawKnexRepository";
import dotenv from "dotenv";
import { Withdraw } from "../domain";
import { CashFlowKnexRepository } from "../../cash-flow/repository";
import { WithdrawNotFound } from "./error";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("Withdraw Knex Repository", () => {
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	20000;
	const fakeWithdraw = Withdraw.load({
		id: "withdrawid1",
		accountID: {
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
		},
		value: {
			amount: 100,
			currency: "USD",
		},
		operationDate: new Date("2022-01-10T10:00:00"),
		settlementDate: new Date("2022-01-11T10:00:00"),
		createdAt: new Date(),
		note: "note for test...",
	});
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should add a new withdraw to the database.", async () => {
		const withdrawKnexRepository = new WithdrawKnexRepository(database);
		expect(
			Number(
				(
					await database(WithdrawKnexRepository.withdrawTableName)
						.where("id", fakeWithdraw.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeWithdraw.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		await withdrawKnexRepository.add(fakeWithdraw);
		expect(
			Number(
				(
					await database(WithdrawKnexRepository.withdrawTableName)
						.where("id", fakeWithdraw.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeWithdraw.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
	});
	test("It should throw error when getting by ID that doesn't exist.", async () => {
		const withdrawKnexRepository = new WithdrawKnexRepository(database);
		await expect(
			withdrawKnexRepository.getByID("WrongId"),
		).rejects.toBeInstanceOf(WithdrawNotFound);
	});
	test("It should return a withdraw by ID", async () => {
		const withdrawKnexRepository = new WithdrawKnexRepository(database);
		const withdraw = await withdrawKnexRepository.getByID(
			fakeWithdraw.id.value,
		);
		expect(withdraw).toBeInstanceOf(Withdraw);
		expect(withdraw.is(fakeWithdraw)).toBe(true);
		expect(withdraw.id.value).toBe(fakeWithdraw.id.value);
		expect(withdraw.state.cashFlow.state.value.value.amount).toBe(
			fakeWithdraw.state.cashFlow.state.value.value.amount,
		);
	});
});
