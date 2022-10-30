import { Knex } from "knex";
import { DepositKnexRepository } from "./DepositKnexRepository";
import dotenv from "dotenv";
import { Deposit } from "../domain";
import { CashFlowKnexRepository } from "../../cash-flow/repository";
import { DepositNotFound } from "./error";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("Deposit Knex Repository", () => {
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	const fakeDeposit = Deposit.load({
		id: "depositid1",
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
	test("It should add a new deposit to the database.", async () => {
		const depositKnexRepository = new DepositKnexRepository(database);
		expect(
			Number(
				(
					await database(DepositKnexRepository.depositTableName)
						.where("id", fakeDeposit.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeDeposit.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		await depositKnexRepository.add(fakeDeposit);
		expect(
			Number(
				(
					await database(DepositKnexRepository.depositTableName)
						.where("id", fakeDeposit.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeDeposit.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
	});
	test("It should throw error when getting by ID that doesn't exist.", async () => {
		const depositKnexRepository = new DepositKnexRepository(database);
		await expect(
			depositKnexRepository.getByID("WrongId"),
		).rejects.toBeInstanceOf(DepositNotFound);
	});
	test("It should return a deposit by ID", async () => {
		const depositKnexRepository = new DepositKnexRepository(database);
		const deposit = await depositKnexRepository.getByID(fakeDeposit.id.value);
		expect(deposit).toBeInstanceOf(Deposit);
		expect(deposit.is(fakeDeposit)).toBe(true);
		expect(deposit.id.value).toBe(fakeDeposit.id.value);
		expect(deposit.state.cashFlow.state.value.value.amount).toBe(
			fakeDeposit.state.cashFlow.state.value.value.amount,
		);
	});
	test("It should delete a deposit by ID", async () => {
		const depositKnexRepository = new DepositKnexRepository(database);
		await depositKnexRepository.delete(fakeDeposit.id.value);
		expect(
			Number(
				(
					await database(DepositKnexRepository.depositTableName)
						.where("id", fakeDeposit.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeDeposit.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
	});
});
