import dotenv from "dotenv";
import request from "supertest";
import { Knex } from "knex";
import mongoose from "mongoose";
import { MongoConnection } from "../../src/modules/database/mongoose";
import { Server } from "../../src/main/server";
import { CashFlowKnexRepository } from "../../src/modules/cash-flow/repository";
import { DepositKnexRepository } from "../../src/modules/deposit/repository";
import { createKnexDatabase, getKnexConnection } from "./utils/utils";

describe("Deposit HTTP API", () => {
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
		deposit: {
			id?: string;
			value: {
				amount: number;
				currency: string;
			};
			date: Date;
			note?: string;
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
		deposit: {
			value: {
				amount: 1100.5,
				currency: "BRL",
			},
			date: new Date("2022-02-01T16:00:00"),
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
	test("It should create a deposit.", async () => {
		const response = await request(app)
			.post("/deposit")
			.set(inputs.headers)
			.send({
				brokerID: inputs.account.brokerID,
				value: {
					amount: inputs.deposit.value.amount,
					currency: inputs.deposit.value.currency,
				},
				date: inputs.deposit.date,
			});
		if (response.status !== 201) console.error(response.body);
		expect(response.status).toBe(201);
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
			.andWhere("valueAmount", inputs.deposit.value.amount)
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
		expect(cashFlowSelect[0].valueAmount).toBe(inputs.deposit.value.amount);
		expect(cashFlowSelect[0].valueCurrency).toBe(inputs.deposit.value.currency);
		expect(cashFlowSelect[0].operation).toBe("IN");
		expect(cashFlowSelect[0].operationDate.getTime()).toBe(
			inputs.deposit.date.getTime(),
		);
		expect(cashFlowSelect[0].settlementDate.getTime()).toBe(
			inputs.deposit.date.getTime(),
		);
		inputs.deposit.id = cashFlowSelect[0].id;
		const depositSelect = await knexConnection<{
			id: string;
			note?: string;
		}>(DepositKnexRepository.depositTableName)
			.where("id", cashFlowSelect[0].id)
			.select("id", "note");
		expect(depositSelect).toHaveLength(1);
		expect(depositSelect[0].id).toBe(cashFlowSelect[0].id);
		await new Promise((r) => setTimeout(r, 1000));
	});
	test("It should delete a deposit.", async () => {
		const response = await request(app)
			.delete("/deposit/" + inputs.deposit.id)
			.set(inputs.headers);
		if (response.status !== 204) console.error(response.body);
		expect(response.status).toBe(204);
		const cashFlowSelect = await knexConnection<{
			id: string;
		}>(CashFlowKnexRepository.cashFlowTableName)
			.where("id", inputs.deposit.id)
			.select();
		expect(cashFlowSelect).toHaveLength(0);
		const depositSelect = await knexConnection<{
			id: string;
		}>(DepositKnexRepository.depositTableName)
			.where("id", inputs.deposit.id)
			.select();
		expect(depositSelect).toHaveLength(0);
		await new Promise((r) => setTimeout(r, 1000));
	});
});
