import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { Server } from "../../src/main/server";
import { CashFlowKnexRepository } from "../../src/modules/cash-flow/repository";
import { EarningKnexRepository } from "../../src/modules/earning/repository";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";

describe("Earning HTTP API", () => {
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
		account: {
			brokerID: string;
		};
		brazilianStocks: {
			id: string;
			name: string;
		}[];
		earnings: {
			id?: string;
			value: {
				amount: number;
				currency: string;
			};
			operationDate: Date;
			settlementDate: Date;
			type: string;
			quantity: number;
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
		earnings: [
			{
				value: {
					amount: 1.5,
					currency: "BRL",
				},
				operationDate: new Date("2022-03-01T16:00:00"),
				settlementDate: new Date("2022-03-02T00:00:00"),
				type: "DIVIDEND",
				quantity: 2,
			},
			{
				value: {
					amount: 0.5,
					currency: "BRL",
				},
				operationDate: new Date("2022-10-01T16:00:00"),
				settlementDate: new Date("2022-10-02T00:00:00"),
				type: "JCP",
				quantity: 10,
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
	test("It should create an earning.", async () => {
		const response = await request(app)
			.post("/earning")
			.set(inputs.headers)
			.send({
				...inputs.earnings[0],
				brokerID: inputs.account.brokerID,
				assetID: inputs.brazilianStocks[0].id,
			});
		if (response.status !== 201) console.error(response.body);
		expect(response.status).toBe(201);
		await new Promise((r) => setTimeout(r, 2000));
		const cashFlowSelect = await knexConnection<{
			id: string;
			brokerID: string;
			valueAmount: number;
			valueCurrency: string;
			operation: string;
			operationDate: Date;
			settlementDate: Date;
		}>(CashFlowKnexRepository.cashFlowTableName)
			.where("brokerID", inputs.account!.brokerID)
			.andWhere("valueAmount", inputs.earnings[0].value.amount)
			.andWhere("operation", "IN")
			.select(
				"id",
				"brokerID",
				"valueAmount",
				"valueCurrency",
				"operation",
				"operationDate",
				"settlementDate",
			);
		expect(cashFlowSelect).toHaveLength(1);
		expect(cashFlowSelect[0].brokerID).toBe(inputs.account!.brokerID);
		expect(cashFlowSelect[0].valueAmount).toBe(inputs.earnings[0].value.amount);
		expect(cashFlowSelect[0].valueCurrency).toBe(
			inputs.earnings[0].value.currency,
		);
		expect(cashFlowSelect[0].operation).toBe("IN");
		expect(cashFlowSelect[0].operationDate.getTime()).toBe(
			inputs.earnings[0].operationDate.getTime(),
		);
		expect(cashFlowSelect[0].settlementDate.getTime()).toBe(
			inputs.earnings[0].settlementDate.getTime(),
		);
		inputs.earnings[0].id = cashFlowSelect[0].id;
		const earningSelect = await knexConnection<{
			id: string;
			assetID: string;
			type: string;
			quantity: number;
		}>(EarningKnexRepository.earningTableName)
			.where("id", cashFlowSelect[0].id)
			.select("id", "assetID", "type", "quantity");
		expect(earningSelect).toHaveLength(1);
		expect(earningSelect[0].id).toBe(cashFlowSelect[0].id);
		expect(earningSelect[0].assetID).toBe(inputs.brazilianStocks[0].id);
		expect(earningSelect[0].type).toBe(inputs.earnings[0].type);
		expect(earningSelect[0].quantity).toBe(inputs.earnings[0].quantity);
		await request(app)
			.post("/earning")
			.set(inputs.headers)
			.send({
				...inputs.earnings[1],
				brokerID: inputs.account.brokerID,
				assetID: inputs.brazilianStocks[1].id,
			});
		await new Promise((r) => setTimeout(r, 2000));
	});
	test("It should return investor last earnings by account/broker.", async () => {
		const response = await request(app)
			.get("/earnings")
			.query({
				brokerID: inputs.account!.brokerID,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(2);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(2);
	});
	test("It should return investor last earnings by type.", async () => {
		const response = await request(app)
			.get("/earnings")
			.query({
				type: "DIVIDEND",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should return investor last earnings by asset name.", async () => {
		const response = await request(app)
			.get("/earnings")
			.query({
				assetName: inputs.brazilianStocks[1].name,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should return investor last earnings by asset type.", async () => {
		const response = await request(app)
			.get("/earnings")
			.query({
				assetType: "BRAZILIAN_STOCK",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(2);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(2);
	});
	test("It should return investor last earnings by operation date.", async () => {
		const response = await request(app)
			.get("/earnings")
			.query({
				operationDate: "2022-03-03",
				operationDateComparisonOperator: "before",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should return investor last earnings by settlement date.", async () => {
		const response = await request(app)
			.get("/earnings")
			.query({
				settlementDate: "2022-03-04",
				settlementDateComparisonOperator: "since",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should return investor last earnings by value amount.", async () => {
		const response = await request(app)
			.get("/earnings")
			.query({
				valueAmount: 1,
				valueAmountComparisonOperator: "greaterThanOrEqualTo",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
	});
	test("It should delete an earning.", async () => {
		const response = await request(app)
			.delete("/earning/" + inputs.earnings[0].id)
			.set(inputs.headers);
		if (response.status !== 204) console.error(response.body);
		expect(response.status).toBe(204);
		const cashFlowSelect = await knexConnection<{
			id: string;
		}>(CashFlowKnexRepository.cashFlowTableName)
			.where("id", inputs.earnings[0].id)
			.select();
		expect(cashFlowSelect).toHaveLength(0);
		const earningSelect = await knexConnection<{
			id: string;
		}>(EarningKnexRepository.earningTableName)
			.where("id", inputs.earnings[0].id)
			.select();
		expect(earningSelect).toHaveLength(0);
		await new Promise((r) => setTimeout(r, 1000));
	});
});
