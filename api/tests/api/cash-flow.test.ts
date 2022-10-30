import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { Server } from "../../src/main/server";
import { seedCashFlows } from "../seeds/mongoose/cash-flows";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";

describe("Cash Flow HTTP API", () => {
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
	};
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		knexConnection = getKnexConnection(databaseName);
		mongoConnection = await MongoConnection(databaseName);
		app = new Server(knexConnection, mongoConnection).http.app;
		await seedCashFlows(mongoConnection);
		const response = await request(app)
			.post("/login")
			.set(inputs.headers)
			.send({
				username: inputs.investor.username,
				password: inputs.investor.password,
			});
		inputs.headers.authorization = `Bearer ${response.body.token}`;
	});
	afterAll(async () => {
		//Knex
		await knexConnection.raw(`DROP DATABASE IF EXISTS ${databaseName}`);
		await knexConnection.destroy();
		//Mongo
		await mongoConnection.db.dropDatabase();
		await mongoConnection.close();
	});
	test("It should return investor last cash flows by account/broker.", async () => {
		const response = await request(app)
			.get("/cash-flows")
			.query({
				brokerID: inputs.account!.brokerID,
				limit: 10,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(8);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(8);
	});
	test("It should return investor last cash flows by operation.", async () => {
		const response = await request(app)
			.get("/cash-flows")
			.query({
				operation: "IN",
				limit: 10,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(2);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(2);
		expect(response.body.results[0].value.amount).toBe(100);
	});
	test("It should return investor last cash flows by source.", async () => {
		const response = await request(app)
			.get("/cash-flows")
			.query({
				source: "DEPOSIT",
				limit: 2,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(1);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(1);
		expect(response.body.results[0].source).toBe("DEPOSIT");
	});
	test("It should return investor last cash flows with offset and under limit.", async () => {
		const response = await request(app)
			.get("/cash-flows")
			.query({
				limit: 2,
				offset: 2,
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(8);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(2);
		expect(response.body.results[0].id).toBe("cashflowid6");
		expect(response.body.results[1].id).toBe("cashflowid5");
	});
	test("It should return investor last cash flows by value", async () => {
		const response = await request(app)
			.get("/cash-flows")
			.query({
				valueAmount: 50,
				valueAmountComparisonOperator: "greaterThan",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(4);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(4);
		const response2 = await request(app)
			.get("/cash-flows")
			.query({
				valueAmount: 100,
			})
			.set(inputs.headers);
		expect(response2.body.total).toBe(2);
		expect(response2.body.results).toBeInstanceOf(Array);
		expect(response2.body.results.length).toBe(2);
		const response3 = await request(app)
			.get("/cash-flows")
			.query({
				valueCurrency: "USD",
			})
			.set(inputs.headers);
		expect(response3.body.total).toBe(0);
		expect(response3.body.results).toBeInstanceOf(Array);
		expect(response3.body.results.length).toBe(0);
	});
	test("It should return investor last cash flows by operation date.", async () => {
		const response = await request(app)
			.get("/cash-flows")
			.query({
				operationDate: "2022-04-01",
				operationDateComparisonOperator: "since",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(3);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(3);
		const response2 = await request(app)
			.get("/cash-flows")
			.query({
				operationDate: "2022-04-01",
				operationDateComparisonOperator: "before",
			})
			.set(inputs.headers);
		expect(response2.body.total).toBe(5);
		expect(response2.body.results).toBeInstanceOf(Array);
		expect(response2.body.results.length).toBe(5);
	});
	test("It should return investor last cash flows by settlement date.", async () => {
		const response = await request(app)
			.get("/cash-flows")
			.query({
				settlementDate: "2022-04-01",
				settlementDateComparisonOperator: "since",
			})
			.set(inputs.headers);
		expect(response.body.total).toBe(3);
		expect(response.body.results).toBeInstanceOf(Array);
		expect(response.body.results.length).toBe(3);
		const response2 = await request(app)
			.get("/cash-flows")
			.query({
				settlementDate: "2022-04-01",
				settlementDateComparisonOperator: "before",
			})
			.set(inputs.headers);
		expect(response2.body.total).toBe(5);
		expect(response2.body.results).toBeInstanceOf(Array);
		expect(response2.body.results.length).toBe(5);
	});
});
