import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MemoryMongoConnection } from "../../../../tests/databases/mongodb/MemoryMongoConnection";
import { CashFlowMongoDataGateway } from "../../cash-flow/data-gateway";
import { WithdrawMongoDataGateway } from "./WithdrawMongoDataGateway";

describe("[withdraw] Withdraw Mongo DataGateway", () => {
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
			WithdrawMongoDataGateway.withdrawCollectionName,
		);
	});
	afterAll(async () => {
		await database.db.dropDatabase();
		await database.close();
		await mongoMemoryServer.stop();
	});
	test("It should add a new withdraw data.", async () => {
		const withdrawMongoDataGateway = new WithdrawMongoDataGateway(database);
		await withdrawMongoDataGateway.add({
			id: "withdrawid1",
			note: "withdraw note...",
		});
		const withdrawModel = database.models.withdraws;
		const response = await withdrawModel.findOne({ _id: "withdrawid1" });
		expect(response?._id).toBe("withdrawid1");
	});
	test("It should delete a withdraw data.", async () => {
		const withdrawMongoDataGateway = new WithdrawMongoDataGateway(database);
		await withdrawMongoDataGateway.delete("withdrawid1");
		const withdrawModel = database.models.withdraws;
		const response = await withdrawModel.findOne<{ _id: string }>({
			_id: "withdrawid1",
		});
		expect(response).toBeNull();
	});
});
