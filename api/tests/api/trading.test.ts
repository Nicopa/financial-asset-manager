import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { Server } from "../../src/main/server";
import { CashFlowKnexRepository } from "../../src/modules/cash-flow/repository";
import { TradingKnexRepository } from "../../src/modules/trading/repository";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";

describe("Trading HTTP API", () => {
	dotenv.config();
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	let app: any;
	let knexConnection: Knex<any, unknown[]>;
	let mongoConnection: mongoose.Connection;
	const inputs: {
		headers: Record<string, string>;
		investor: {
			username: string;
			password: string;
		};
		account?: {
			brokerID: string;
		};
		brazilianStocks: {
			id: string;
			name: string;
		}[];
		tradings: {
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
		}[];
	} = {
		headers: {
			Accept: "application/json",
		},
		investor: {
			username: "testinguser",
			password: "Test!123",
		},
		account: {
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
		},
		brazilianStocks: [],
		tradings: [
			{
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
			{
				operation: "DISPOSAL",
				operationDate: new Date("2022-04-01T16:00:00"),
				settlementDate: new Date("2022-04-02T00:00:00"),
				quantity: 1,
				grossTotal: {
					amount: 100,
					currency: "BRL",
				},
				fee: {
					amount: 0.4,
					currency: "BRL",
				},
				brokerageFee: {
					amount: 0.29,
					currency: "BRL",
				},
			},
			{
				operation: "ACQUISITION",
				operationDate: new Date("2022-05-05T16:00:00"),
				settlementDate: new Date("2022-05-06T00:00:00"),
				quantity: 100,
				grossTotal: {
					amount: 9000,
					currency: "USD",
				},
				fee: {
					amount: 2,
					currency: "USD",
				},
				brokerageFee: {
					amount: 1.25,
					currency: "USD",
				},
			},
			{
				operation: "ACQUISITION",
				operationDate: new Date("2022-05-10T16:00:00"),
				settlementDate: new Date("2022-05-11T00:00:00"),
				quantity: 100,
				grossTotal: {
					amount: 1000,
					currency: "USD",
				},
				fee: {
					amount: 1,
					currency: "USD",
				},
				brokerageFee: {
					amount: 1.25,
					currency: "USD",
				},
			},
		],
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
			.get("/brazilian-stocks")
			.set(inputs.headers);
		inputs.brazilianStocks = response2.body;
	});
	afterAll(async () => {
		//Knex
		await knexConnection.raw(`DROP DATABASE IF EXISTS ${databaseName}`);
		await knexConnection.destroy();
		//Mongo
		await mongoConnection.db.dropDatabase();
		await mongoConnection.close();
	});
	test("It should create a trading.", async () => {
		const response = await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[0],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.brazilianStocks[0].id,
			});
		if (response.status !== 201) console.error(response.body);
		expect(response.status).toBe(201);
		await new Promise((r) => setTimeout(r, 2000));
		const tradingSelect = await knexConnection<{
			id: string;
			brokerID: string;
			assetID: string;
			operation: string;
			operationDate: Date;
			settlementDate: Date;
			grossTotalCashFlowID: string;
			feeCashFlowID: string;
			brokerageFeeCashFlowID: string;
		}>(TradingKnexRepository.tradingTableName)
			.where("brokerID", inputs.account!.brokerID)
			.andWhere("assetID", inputs.brazilianStocks[0].id)
			.andWhere("operation", inputs.tradings[0].operation)
			.andWhere("operationDate", inputs.tradings[0].operationDate)
			.andWhere("settlementDate", inputs.tradings[0].settlementDate)
			.select(
				"id",
				"brokerID",
				"assetID",
				"operation",
				"operationDate",
				"settlementDate",
				"grossTotalCashFlowID",
				"feeCashFlowID",
				"brokerageFeeCashFlowID",
			);
		expect(tradingSelect).toHaveLength(1);
		expect(tradingSelect[0].brokerID).toBe(inputs.account!.brokerID);
		expect(tradingSelect[0].assetID).toBe(inputs.brazilianStocks[0].id);
		inputs.tradings[0].id = tradingSelect[0].id;
		inputs.tradings[0].grossTotal.id = tradingSelect[0].grossTotalCashFlowID;
		inputs.tradings[0].fee!.id = tradingSelect[0].feeCashFlowID;
		inputs.tradings[0].brokerageFee!.id =
			tradingSelect[0].brokerageFeeCashFlowID;
		const cashFlowSelect = await knexConnection<{
			id: string;
			brokerID: string;
			valueAmount: number;
			valueCurrency: string;
			operation: string;
			operationDate: Date;
			settlementDate: Date;
		}>(CashFlowKnexRepository.cashFlowTableName)
			.where("id", tradingSelect[0].grossTotalCashFlowID)
			.orWhere("id", tradingSelect[0].feeCashFlowID)
			.orWhere("id", tradingSelect[0].brokerageFeeCashFlowID)
			.orderBy("valueAmount", "desc")
			.select(
				"id",
				"brokerID",
				"valueAmount",
				"valueCurrency",
				"operation",
				"operationDate",
				"settlementDate",
			);
		expect(cashFlowSelect).toHaveLength(3);
		expect(cashFlowSelect[0].valueAmount).toBe(
			inputs.tradings[0].grossTotal.amount,
		);
		expect(cashFlowSelect[1].valueAmount).toBe(inputs.tradings[0].fee!.amount);
		expect(cashFlowSelect[2].valueAmount).toBe(
			inputs.tradings[0].brokerageFee!.amount,
		);
		const response2 = await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[1],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.brazilianStocks[1].id,
			});
		if (response2.status !== 201) console.error(response2.body);
		await new Promise((r) => setTimeout(r, 2000));
		expect(response2.status).toBe(201);
		const response3 = await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[2],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.brazilianStocks[1].id,
			});
		if (response3.status !== 201) console.error(response3.body);
		expect(response3.status).toBe(201);
		await new Promise((r) => setTimeout(r, 2000));
		const response4 = await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[3],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.brazilianStocks[2].id,
			});
		if (response4.status !== 201) console.error(response4.body);
		expect(response4.status).toBe(201);
		await new Promise((r) => setTimeout(r, 2000));
	});
	test("It should return investor last tradings by account/broker.", async () => {
		const response = await request(app)
			.get("/tradings")
			.query({
				brokerID: inputs.account!.brokerID,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(4);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(4);
	});
	test("It should return investor last tradings by operation.", async () => {
		const response = await request(app)
			.get("/tradings")
			.query({
				operation: "DISPOSAL",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should return investor last tradings by asset name.", async () => {
		const response = await request(app)
			.get("/tradings")
			.query({
				assetName: inputs.brazilianStocks[1].name,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(2);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(2);
	});
	test("It should return investor last tradings by asset type.", async () => {
		const response = await request(app)
			.get("/tradings")
			.query({
				assetType: "BRAZILIAN_STOCK",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(4);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(4);
	});
	test("It should return investor last tradings by operation date.", async () => {
		const response = await request(app)
			.get("/tradings")
			.query({
				operationDate: "2022-03-03",
				operationDateComparisonOperator: "before",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should return investor last tradings by settlement date.", async () => {
		const response = await request(app)
			.get("/tradings")
			.query({
				settlementDate: "2022-03-04",
				settlementDateComparisonOperator: "since",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(3);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(3);
	});
	test("It should return investor last tradings by gross total amount.", async () => {
		const response = await request(app)
			.get("/tradings")
			.query({
				grossTotalAmount: 9000,
				grossTotalAmountComparisonOperator: "greaterThanOrEqualTo",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should delete a trading", async () => {
		const response = await request(app)
			.delete("/trading/" + inputs.tradings[0].id)
			.set(inputs.headers);
		if (response.status !== 204) console.error(response.body);
		expect(response.status).toBe(204);
		const tradingSelect = await knexConnection<{
			id: string;
		}>(TradingKnexRepository.tradingTableName)
			.where("id", inputs.tradings[0].id)
			.select("id");
		expect(tradingSelect).toHaveLength(0);
		await new Promise((r) => setTimeout(r, 1000));
	});
});
