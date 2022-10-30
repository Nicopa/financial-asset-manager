import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { Server } from "../../src/main/server";
import { AccountKnexRepository } from "../../src/modules/account/repository";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";
import { CashFlowKnexRepository } from "../../src/modules/cash-flow/repository";
import { TradingKnexRepository } from "../../src/modules/trading/repository";

describe("Account HTTP API", () => {
	dotenv.config();
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	let app: any;
	let knexConnection: Knex<any, unknown[]>;
	let mongoConnection: mongoose.Connection;
	const inputs: {
		headers: Record<string, string>;
		investor: {
			id?: string;
			username: string;
			password: string;
		};
		brokers: {
			id: string;
			tradingName: string;
		}[];
		account?: {
			brokerID: string;
		};
		deposit: {
			id?: string;
			value: {
				amount: number;
				currency: string;
			};
			date: Date;
			note?: string;
		};
		withdraw: {
			id?: string;
			value: {
				amount: number;
				currency: string;
			};
			date: Date;
			note?: string;
		};
		brazilianStockID: string;
		trading: {
			id?: string;
			operation: string;
			operationDate: Date;
			settlementDate: Date;
			quantity: number;
			grossTotal: {
				id?: string;
				amount: number;
				currency: string;
			};
			fee?: {
				id?: string;
				amount: number;
				currency: string;
			};
			brokerageFee?: {
				id?: string;
				amount: number;
				currency: string;
			};
		};
	} = {
		headers: {
			Accept: "application/json",
		},
		investor: {
			id: "7bce35a2cfa048dd93bba3029ab21903",
			username: "testinguser",
			password: "Test!123",
		},
		brokers: [],
		deposit: {
			value: {
				amount: 500,
				currency: "BRL",
			},
			date: new Date("2022-02-01T16:00:00"),
		},
		withdraw: {
			value: {
				amount: 250,
				currency: "BRL",
			},
			date: new Date("2022-02-01T16:00:00"),
		},
		brazilianStockID: "3bf0e3c3a7ad4aafab845a8ea0cd2313",
		trading: {
			operation: "ACQUISITION",
			operationDate: new Date("2022-03-01T16:00:00"),
			settlementDate: new Date("2022-03-02T00:00:00"),
			quantity: 2,
			grossTotal: {
				amount: 200,
				currency: "BRL",
			},
			fee: {
				amount: 0.5,
				currency: "BRL",
			},
			brokerageFee: {
				amount: 0.25,
				currency: "BRL",
			},
		},
	};
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		knexConnection = getKnexConnection(databaseName);
		mongoConnection = await MongoConnection(databaseName);
		app = new Server(knexConnection, mongoConnection).http.app;
		const response = await request(app)
			.post("/login")
			.set(inputs.headers)
			.send({
				username: inputs.investor.username,
				password: inputs.investor.password,
			});
		inputs.headers.authorization = `Bearer ${response.body.token}`;
		const response2 = await request(app)
			.get("/brokers/available")
			.set(inputs.headers);
		inputs.brokers = response2.body;
	});
	afterAll(async () => {
		//Knex
		await knexConnection.raw(`DROP DATABASE IF EXISTS ${databaseName}`);
		await knexConnection.destroy();
		//Mongo
		await mongoConnection.db.dropDatabase();
		await mongoConnection.close();
	});
	test("It should create an account.", async () => {
		const response = await request(app)
			.post("/account")
			.set(inputs.headers)
			.send({
				brokerID: inputs.brokers[0].id,
			});
		expect(response.status).toBe(201);
		const select = await knexConnection<{
			investorID: string;
			brokerID: string;
		}>(AccountKnexRepository.accountTableName).select("investorID", "brokerID");
		expect(select).toHaveLength(2);
		inputs.account = {
			brokerID: select[1].brokerID,
		};
	});
	test("It should return all accounts.", async () => {
		await new Promise((r) => setTimeout(r, 100));
		const response = await request(app).get("/accounts").set(inputs.headers);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body.length).toBe(2);
		expect(response.body[0].thumbnail.length).toBeGreaterThan(10);
		expect(response.body[0].BRLbalance).toBe(0);
		expect(response.body[0].USDbalance).toBe(0);
		expect(response.body[1].BRLbalance).toBe(0);
		expect(response.body[1].USDbalance).toBe(0);
	});
	test("It should update account on deposit creation or delete.", async () => {
		await request(app)
			.post("/deposit")
			.set(inputs.headers)
			.send({
				brokerID: inputs.account!.brokerID,
				value: {
					amount: inputs.deposit.value.amount,
					currency: inputs.deposit.value.currency,
				},
				date: inputs.deposit.date,
			});
		const cashFlowSelect = await knexConnection<{ id: string }>(
			CashFlowKnexRepository.cashFlowTableName,
		)
			.where("brokerID", inputs.account!.brokerID)
			.andWhere("valueAmount", inputs.deposit.value.amount)
			.andWhere("operation", "IN")
			.select("id");
		inputs.deposit.id = cashFlowSelect[0].id;
		await new Promise((r) => setTimeout(r, 1500));
		let accountSelect = await knexConnection<{
			BRLbalance: number;
			USDbalance: number;
		}>(AccountKnexRepository.accountTableName)
			.where("investorID", inputs.investor.id)
			.where("brokerID", inputs.account!.brokerID)
			.first();
		expect(accountSelect?.BRLbalance).toBe(500);
		expect(accountSelect?.USDbalance).toBe(0);
		await request(app)
			.delete("/deposit/" + inputs.deposit.id)
			.set(inputs.headers);
		await new Promise((r) => setTimeout(r, 1500));
		accountSelect = await knexConnection<{
			BRLbalance: number;
			USDbalance: number;
		}>(AccountKnexRepository.accountTableName)
			.where("investorID", inputs.investor.id)
			.where("brokerID", inputs.account!.brokerID)
			.first();
		expect(accountSelect?.BRLbalance).toBe(0);
		expect(accountSelect?.USDbalance).toBe(0);
	});
	test("It should update account on withdraw creation or delete.", async () => {
		await request(app)
			.post("/withdraw")
			.set(inputs.headers)
			.send({
				brokerID: inputs.account!.brokerID,
				value: {
					amount: inputs.withdraw.value.amount,
					currency: inputs.withdraw.value.currency,
				},
				date: inputs.withdraw.date,
			});
		const cashFlowSelect = await knexConnection<{ id: string }>(
			CashFlowKnexRepository.cashFlowTableName,
		)
			.where("brokerID", inputs.account!.brokerID)
			.andWhere("valueAmount", inputs.withdraw.value.amount)
			.andWhere("operation", "OUT")
			.select("id");
		inputs.withdraw.id = cashFlowSelect[0].id;
		await new Promise((r) => setTimeout(r, 1000));
		let accountSelect = await knexConnection<{
			BRLbalance: number;
			USDbalance: number;
		}>(AccountKnexRepository.accountTableName)
			.where("investorID", inputs.investor.id)
			.where("brokerID", inputs.account!.brokerID)
			.first();
		expect(accountSelect?.BRLbalance).toBe(-250);
		expect(accountSelect?.USDbalance).toBe(0);
		await request(app)
			.delete("/withdraw/" + inputs.withdraw.id)
			.set(inputs.headers);
		await new Promise((r) => setTimeout(r, 1500));
		accountSelect = await knexConnection<{
			BRLbalance: number;
			USDbalance: number;
		}>(AccountKnexRepository.accountTableName)
			.where("investorID", inputs.investor.id)
			.where("brokerID", inputs.account!.brokerID)
			.first();
		expect(accountSelect?.BRLbalance).toBe(0);
		expect(accountSelect?.USDbalance).toBe(0);
	});
	test("It should update account on trading creation or delete.", async () => {
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.trading,
				brokerID: inputs.account!.brokerID,
				assetID: inputs.brazilianStockID,
			});
		const tradingSelect = await knexConnection<{
			id: string;
		}>(TradingKnexRepository.tradingTableName)
			.where("brokerID", inputs.account!.brokerID)
			.andWhere("operation", inputs.trading.operation)
			.andWhere("operationDate", inputs.trading.operationDate)
			.andWhere("settlementDate", inputs.trading.settlementDate)
			.select("id");
		inputs.trading.id = tradingSelect[0].id;
		await new Promise((r) => setTimeout(r, 1500));
		let accountSelect = await knexConnection<{
			BRLbalance: number;
			USDbalance: number;
		}>(AccountKnexRepository.accountTableName)
			.where("investorID", inputs.investor.id)
			.where("brokerID", inputs.account!.brokerID)
			.first();
		expect(accountSelect?.BRLbalance).toBe(-200.75);
		expect(accountSelect?.USDbalance).toBe(0);
		await request(app)
			.delete("/trading/" + inputs.trading.id)
			.set(inputs.headers);
		await new Promise((r) => setTimeout(r, 1500));
		accountSelect = await knexConnection<{
			BRLbalance: number;
			USDbalance: number;
		}>(AccountKnexRepository.accountTableName)
			.where("investorID", inputs.investor.id)
			.where("brokerID", inputs.account!.brokerID)
			.first();
		expect(accountSelect?.BRLbalance).toBe(0);
		expect(accountSelect?.USDbalance).toBe(0);
	});
});
