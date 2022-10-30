import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { Server } from "../../src/main/server";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";
import { WalletKnexRepository } from "../../src/modules/wallet/repository";
import { getWorkingDaysBetween } from "../../src/modules/utils/workingDaysBetween";
import { InvestorKnexRepository } from "../../src/modules/investor/repository";
import { TradingKnexRepository } from "../../src/modules/trading/repository";

describe("Wallet HTTP API", () => {
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
		account?: {
			brokerID: string;
		};
		brokers: {
			id: string;
			tradingName: string;
		}[];
		assets: string[];
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
			id: "",
			username: "testinguser2",
			fullname: "Testing user",
			password: "Test!123",
		},
		brokers: [],
		assets: [
			"5b01c4bafe8f4a9b88769d0622039ac8",
			"333b9e551d8f492cabc9c0c23c467cbf",
			"3eaa1cc211824ed1b3b66cc6167a1995",
			"859497d98ca9435c8c749d9cc5854ce9",
			"e864b2c53c5a4fc4a5f385b29b0131b8",
		],
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
				quantity: 2,
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
				operationDate: new Date("2022-05-05T16:00:00"),
				settlementDate: new Date("2022-05-06T00:00:00"),
				quantity: 10,
				grossTotal: {
					amount: 900,
					currency: "USD",
				},
				fee: {
					amount: 0.2,
					currency: "USD",
				},
				brokerageFee: {
					amount: 0.15,
					currency: "USD",
				},
			},
			{
				operation: "ACQUISITION",
				operationDate: new Date("2022-01-10T16:00:00"),
				settlementDate: new Date("2022-01-11T00:00:00"),
				quantity: 800,
				grossTotal: {
					amount: 800,
					currency: "USD",
				},
			},
			{
				operation: "ACQUISITION",
				operationDate: new Date("2022-02-10T16:00:00"),
				settlementDate: new Date("2022-02-11T00:00:00"),
				quantity: 500,
				grossTotal: {
					amount: 500,
					currency: "USD",
				},
			},
			{
				operation: "DISPOSAL",
				operationDate: new Date("2022-05-10T16:00:00"),
				settlementDate: new Date("2022-05-11T00:00:00"),
				quantity: 200,
				grossTotal: {
					amount:
						200 *
						Math.pow(
							1.12,
							getWorkingDaysBetween(
								new Date("2022-05-10T16:00:00"),
								new Date(),
							) / 252,
						),
					currency: "USD",
				},
			},
			{
				operation: "ACQUISITION",
				operationDate: new Date("2022-05-22T16:00:00"),
				settlementDate: new Date("2022-05-23T00:00:00"),
				quantity: 1,
				grossTotal: {
					amount: 100,
					currency: "USD",
				},
				fee: {
					amount: 0.2,
					currency: "USD",
				},
				brokerageFee: {
					amount: 0.15,
					currency: "USD",
				},
			},
		],
	};
	jest.setTimeout(80000);
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
	test("It should add a new wallet after creating an investor.", async () => {
		//create investor
		await request(app).post("/signup").set(inputs.headers).send({
			username: inputs.investor.username,
			fullname: inputs.investor.fullname,
			password: inputs.investor.password,
		});
		await new Promise((r) => setTimeout(r, 1000));
		const investorSelect = await knexConnection<{
			id: string;
			username: string;
			fullname: string;
		}>(InvestorKnexRepository.investorTableName)
			.where("username", inputs.investor.username)
			.select("id", "username", "fullname")
			.first();
		inputs.investor.id = investorSelect!.id;
		//check wallet
		const walletSelect = await knexConnection<{
			id: string;
		}>(WalletKnexRepository.walletTableName)
			.where("id", inputs.investor.id)
			.select("*");
		expect(walletSelect.length).toBe(1);
		//login investor for next tests
		const response = await request(app)
			.post("/login")
			.set(inputs.headers)
			.send({
				username: inputs.investor.username,
				password: inputs.investor.password,
			});
		inputs.headers.authorization = `Bearer ${response.body.token}`;
		//get brokers
		const response2 = await request(app)
			.get("/brokers/available")
			.set(inputs.headers);
		inputs.brokers = response2.body;
		//create an account also
		await request(app).post("/account").set(inputs.headers).send({
			brokerID: inputs.brokers[0].id,
		});
		inputs.account = {
			brokerID: inputs.brokers[0].id,
		};
	});
	test("It should update wallet after creating a trading", async () => {
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[0],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[0],
			});
		await new Promise((r) => setTimeout(r, 2000));
		let walletAssets = await knexConnection<{
			quantity: number;
			acquisitionTotalAmount: number;
		}>(WalletKnexRepository.walletAssetTableName)
			.where("assetID", inputs.assets[0])
			.select();
		expect(walletAssets).toHaveLength(1);
		expect(walletAssets[0].quantity).toBe(inputs.tradings[0].quantity);
		expect(walletAssets[0].acquisitionTotalAmount).toBe(200.75);
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[1],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[0],
			});
		await new Promise((r) => setTimeout(r, 2000));
		walletAssets = await knexConnection<{
			quantity: number;
			acquisitionTotalAmount: number;
		}>(WalletKnexRepository.walletAssetTableName)
			.where("assetID", inputs.assets[0])
			.select();
		expect(walletAssets).toHaveLength(0);
	});
	test("It should return investor wallet.", async () => {
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[2],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[2],
			});
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[3],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[2],
			});
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[4],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[3],
			});
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[5],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[3],
			});
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[6],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[3],
			});
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[1],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[0],
			});
		await new Promise((r) => setTimeout(r, 2000));
		const response = await request(app).get("/wallet").set(inputs.headers);
		if (response.statusCode !== 200) console.error(response.body);
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body.length).toBe(3);
	});
	test("It should update wallet after deleting a trading.", async () => {
		await request(app)
			.post("/trading")
			.set(inputs.headers)
			.send({
				...inputs.tradings[7],
				brokerID: inputs.account!.brokerID,
				assetID: inputs.assets[4],
			});
		const tradingSelect = await knexConnection<{
			id: string;
		}>(TradingKnexRepository.tradingTableName)
			.where("assetID", inputs.assets[4])
			.select("id")
			.first();
		const tradingID = tradingSelect!.id;
		await new Promise((r) => setTimeout(r, 2000));
		await request(app)
			.delete("/trading/" + tradingID)
			.set(inputs.headers);
		await new Promise((r) => setTimeout(r, 2000));
		let walletAssets = await knexConnection<{
			quantity: number;
			acquisitionTotalAmount: number;
		}>(WalletKnexRepository.walletAssetTableName)
			.where("assetID", inputs.assets[4])
			.andWhere("quantity", 1)
			.select();
		expect(walletAssets).toHaveLength(0);
	});
	test("It should return investor wallet.", async () => {
		const response = await request(app)
			.get("/wallet/pie-data")
			.set(inputs.headers);
		if (response.statusCode !== 200) console.error(response.body);
		console.log(response.body);
		expect(response.statusCode).toBe(200);
	});
});
