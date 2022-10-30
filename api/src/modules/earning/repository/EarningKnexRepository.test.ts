import { Knex } from "knex";
import { EarningKnexRepository } from "./EarningKnexRepository";
import dotenv from "dotenv";
import { Earning } from "../domain";
import { CashFlowKnexRepository } from "../../cash-flow/repository";
import { EarningNotFound } from "./error";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("Earning Knex Repository", () => {
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	const fakeEarning = Earning.load({
		id: "earningid1",
		accountID: {
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
		},
		assetID: "asset1",
		value: {
			amount: 100,
			currency: "USD",
		},
		operationDate: new Date("2022-01-10T10:00:00"),
		settlementDate: new Date("2022-01-11T10:00:00"),
		createdAt: new Date(),
		type: "DIVIDEND",
		quantity: 10,
	});
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should add a new earning to the database.", async () => {
		const earningKnexRepository = new EarningKnexRepository(database);
		expect(
			Number(
				(
					await database(EarningKnexRepository.earningTableName)
						.where("id", fakeEarning.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeEarning.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		await earningKnexRepository.add(fakeEarning);
		expect(
			Number(
				(
					await database(EarningKnexRepository.earningTableName)
						.where("id", fakeEarning.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeEarning.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
	});
	test("It should throw error when getting by ID that doesn't exist.", async () => {
		const earningKnexRepository = new EarningKnexRepository(database);
		await expect(
			earningKnexRepository.getByID("WrongId"),
		).rejects.toBeInstanceOf(EarningNotFound);
	});
	test("It should return an earning by ID", async () => {
		const earningKnexRepository = new EarningKnexRepository(database);
		const earning = await earningKnexRepository.getByID(fakeEarning.id.value);
		expect(earning).toBeInstanceOf(Earning);
		expect(earning.is(fakeEarning)).toBe(true);
		expect(earning.id.value).toBe(fakeEarning.id.value);
		expect(earning.state.cashFlow.state.value.value.amount).toBe(
			fakeEarning.state.cashFlow.state.value.value.amount,
		);
	});
	test("It should delete an earning by ID", async () => {
		const earningKnexRepository = new EarningKnexRepository(database);
		await earningKnexRepository.delete(fakeEarning.id.value);
		expect(
			Number(
				(
					await database(EarningKnexRepository.earningTableName)
						.where("id", fakeEarning.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeEarning.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
	});
});
