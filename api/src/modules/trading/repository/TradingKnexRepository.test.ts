import { Knex } from "knex";
import { TradingKnexRepository } from "./TradingKnexRepository";
import dotenv from "dotenv";
import { Trading } from "../domain";
import { CashFlowKnexRepository } from "../../cash-flow/repository";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("Trading Knex Repository", () => {
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	30000;
	const fakeTrading = Trading.load({
		id: "trading1",
		accountID: {
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
		},
		assetID: "3bf0e3c3a7ad4aafab845a8ea0cd2313",
		operation: "ACQUISITION",
		operationDate: new Date("2022-01-10T10:00:00"),
		settlementDate: new Date("2022-01-11T10:00:00"),
		quantity: 2,
		grossTotal: {
			id: "cashflowid1",
			accountID: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			},
			operation: "OUT",
			operationDate: new Date("2022-01-10T10:00:00"),
			settlementDate: new Date("2022-01-11T10:00:00"),
			value: {
				amount: 1000,
				currency: "USD",
			},
			createdAt: new Date(),
		},
		fee: {
			id: "cashflowid2",
			accountID: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			},
			operation: "OUT",
			operationDate: new Date("2022-01-10T10:00:00"),
			settlementDate: new Date("2022-01-11T10:00:00"),
			value: {
				amount: 1000,
				currency: "USD",
			},
			createdAt: new Date(Date.now() + 100),
		},
		brokerageFee: {
			id: "cashflowid3",
			accountID: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			},
			operation: "OUT",
			operationDate: new Date("2022-01-10T10:00:00"),
			settlementDate: new Date("2022-01-11T10:00:00"),
			value: {
				amount: 1000,
				currency: "USD",
			},
			createdAt: new Date(Date.now() + 200),
		},
	});
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should add a new trading to the database.", async () => {
		const tradingKnexRepository = new TradingKnexRepository(database);
		expect(
			Number(
				(
					await database(TradingKnexRepository.tradingTableName)
						.where("id", fakeTrading.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeTrading.state.grossTotal.id.value)
						.orWhere("id", fakeTrading.state.fee!.id.value)
						.orWhere("id", fakeTrading.state.brokerageFee!.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		await tradingKnexRepository.add(fakeTrading);
		expect(
			Number(
				(
					await database(TradingKnexRepository.tradingTableName)
						.where("id", fakeTrading.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeTrading.state.grossTotal.id.value)
						.orWhere("id", fakeTrading.state.fee!.id.value)
						.orWhere("id", fakeTrading.state.brokerageFee!.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(3);
	});
	test("It should delete a trading by ID", async () => {
		const tradingKnexRepository = new TradingKnexRepository(database);
		await tradingKnexRepository.delete(fakeTrading.id.value);
		expect(
			Number(
				(
					await database(TradingKnexRepository.tradingTableName)
						.where("id", fakeTrading.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		expect(
			Number(
				(
					await database(CashFlowKnexRepository.cashFlowTableName)
						.where("id", fakeTrading.state.grossTotal.id.value)
						.orWhere("id", fakeTrading.state.fee!.id.value)
						.orWhere("id", fakeTrading.state.brokerageFee!.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
	});
});
