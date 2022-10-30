import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MemoryMongoConnection } from "../../../../tests/databases/mongodb/MemoryMongoConnection";
import { CashFlowMongoDataGateway } from "../../cash-flow/data-gateway";
import { EarningMongoDataGateway } from "./EarningMongoDataGateway";

describe("[earning] Earning Mongo DataGateway", () => {
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
			EarningMongoDataGateway.earningCollectionName,
		);
	});
	afterAll(async () => {
		await database.db.dropDatabase();
		await database.close();
		await mongoMemoryServer.stop();
	});
	test("It should add a new earning data.", async () => {
		const earningMongoDataGateway = new EarningMongoDataGateway(database);
		await earningMongoDataGateway.add({
			id: "earningid1",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Broker Name",
				},
			},
			asset: {
				id: "assetid1",
				name: "Asset Name 1",
				type: "BRAZILIAN_STOCK",
			},
			value: {
				amount: 10,
				currency: "USD",
			},
			operationDate: new Date(),
			settlementDate: new Date(),
			createdAt: new Date(),
			type: "DIVIDEND",
			quantity: 12,
		});
		const earningModel = database.models.earnings;
		const response = await earningModel.findOne({ _id: "earningid1" });
		expect(response?._id).toBe("earningid1");
	});
	test("It should delete a earning data.", async () => {
		const earningMongoDataGateway = new EarningMongoDataGateway(database);
		await earningMongoDataGateway.delete("earningid1");
		const earningModel = database.models.earnings;
		const response = await earningModel.findOne<{ _id: string }>({
			_id: "earningid1",
		});
		expect(response).toBeNull();
	});
});
