import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MemoryMongoConnection } from "../../../../tests/databases/mongodb/MemoryMongoConnection";
import { CashFlowMongoDataGateway } from "../../cash-flow/data-gateway";
import { DepositMongoDataGateway } from "./DepositMongoDataGateway";

describe("[deposit] Deposit Mongo DataGateway", () => {
	dotenv.config();
	let database: mongoose.Connection;
	let mongoMemoryServer: MongoMemoryServer;
	beforeAll(async () => {
		({ connection: database, mongoMemoryServer } =
			await MemoryMongoConnection());
		await database.createCollection(
			CashFlowMongoDataGateway.cashFlowCollectionName,
		);
		await database.createCollection(
			DepositMongoDataGateway.depositCollectionName,
		);
	});
	afterAll(async () => {
		await database.db.dropDatabase();
		await database.close();
		await mongoMemoryServer.stop();
	});
	test("It should add a new deposit data.", async () => {
		const depositMongoDataGateway = new DepositMongoDataGateway(database);
		await depositMongoDataGateway.add({
			id: "depositid1",
			note: "deposit note...",
		});
		const depositModel = database.models.deposits;
		const response = await depositModel.findOne({ _id: "depositid1" });
		expect(response?._id).toBe("depositid1");
	});
	test("It should delete a deposit data.", async () => {
		const depositMongoDataGateway = new DepositMongoDataGateway(database);
		await depositMongoDataGateway.delete("depositid1");
		const depositModel = database.models.deposits;
		const response = await depositModel.findOne<{ _id: string }>({
			_id: "depositid1",
		});
		expect(response).toBeNull();
	});
});
