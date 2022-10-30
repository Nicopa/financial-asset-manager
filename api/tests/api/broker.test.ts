import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { Server } from "../../src/main/server";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";

describe("Broker HTTP API", () => {
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
	} = {
		headers: {
			Accept: "application/json",
		},
		investor: {
			username: "testinguser",
			password: "Test!123",
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
	});
	afterAll(async () => {
		//Knex
		await knexConnection.raw(`DROP DATABASE IF EXISTS ${databaseName}`);
		await knexConnection.destroy();
		//Mongo
		await mongoConnection.db.dropDatabase();
		await mongoConnection.close();
	});
	test("It should return all available brokers to create account.", async () => {
		const response = await request(app)
			.get("/brokers/available")
			.set(inputs.headers);
		if (response.status !== 200) console.error(response.body);
		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body.length).toBeGreaterThanOrEqual(1);
	});
});
