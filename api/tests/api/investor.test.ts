import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { InvestorKnexRepository } from "../../src/modules/investor/repository";
import { Server } from "../../src/main/server";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";

describe("Investor HTTP API", () => {
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
			fullname: string;
			password: string;
		};
	} = {
		headers: {
			Accept: "application/json",
		},
		investor: {
			id: "",
			username: "investor1",
			fullname: "Investor 1 Fullname",
			password: "Investor!123",
		},
	};
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		knexConnection = getKnexConnection(databaseName);
		mongoConnection = await MongoConnection(databaseName);
		app = new Server(knexConnection, mongoConnection).http.app;
	});
	afterAll(async () => {
		//Knex
		await knexConnection.raw(`DROP DATABASE IF EXISTS ${databaseName}`);
		await knexConnection.destroy();
		//Mongo
		await mongoConnection.db.dropDatabase();
		await mongoConnection.close();
	});
	test("It should sign up a new investor.", async () => {
		const response = await request(app)
			.post("/signup")
			.set(inputs.headers)
			.send({
				username: inputs.investor.username,
				fullname: inputs.investor.fullname,
				password: inputs.investor.password,
			});
		expect(response.status).toBe(201);
		const investorSelect = await knexConnection<{
			id: string;
			username: string;
			fullname: string;
		}>(InvestorKnexRepository.investorTableName)
			.where("username", inputs.investor.username)
			.select("id", "username", "fullname")
			.first();

		expect(investorSelect!.username).toBe(inputs.investor.username);
		expect(investorSelect!.fullname).toBe(inputs.investor.fullname);
		inputs.investor.id = investorSelect!.id;
	});
	test("It should login investor.", async () => {
		const response = await request(app)
			.post("/login")
			.set(inputs.headers)
			.send({
				username: inputs.investor.username,
				password: inputs.investor.password,
			});
		expect(response.status).toBe(200);
		expect(typeof response.body.token).toBe("string");
		expect(response.body.token.length).toBeGreaterThan(10);
		expect(response.body.fullname).toBe("Investor 1 Fullname");
		inputs.headers.authorization = `Bearer ${response.body.token}`;
	});
	test("It should return unauthorized request if authorization header is not set or is not correct.", async () => {
		const response1 = await request(app).get("/investor");
		expect(response1.status).toBe(401);
		const response2 = await request(app)
			.get("/investor")
			.set("authorization", "");
		expect(response2.status).toBe(401);
		const response3 = await request(app)
			.get("/investor")
			.set("authorization", "Wrong Token");
		expect(response3.status).toBe(401);
		const response4 = await request(app)
			.get("/investor")
			.set("authorization", "Bearer ABC");
		expect(response4.status).toBe(401);
	});
	test("It should return investor fullname and cpf (if exists).", async () => {
		const response = await request(app).get("/investor").set(inputs.headers);
		if (response.status !== 200) console.error(response.body);
		expect(response.status).toBe(200);
		expect(response.body.fullname).toBe(inputs.investor.fullname);
	});
});
