import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MemoryMongoConnection } from "../../../../tests/databases/mongodb/MemoryMongoConnection";
import { TradingDataMap } from "./TradingDataGateway";
import { TradingMongoDataGateway } from "./TradingMongoDataGateway";

describe("[trading] Cash Flow Mongo Data Gateway", () => {
	dotenv.config();
	let database: mongoose.Connection;
	let mongoMemoryServer: MongoMemoryServer;
	const tradingsData: TradingDataMap[] = [
		{
			id: "tradingid1",
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
			operation: "DISPOSAL",
			operationDate: new Date(),
			settlementDate: new Date(),
			quantity: 1,
			grossTotal: {
				amount: 1000,
				currency: "USD",
			},
			unitCost: 1000,
			netTotal: 1000,
		},
		{
			id: "tradingid2",
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
			operation: "ACQUISITION",
			operationDate: new Date(),
			settlementDate: new Date(),
			quantity: 1,
			grossTotal: {
				amount: 1000,
				currency: "USD",
			},
			unitCost: 1000,
			netTotal: 1000,
		},
		{
			id: "tradingid3",
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
			operation: "ACQUISITION",
			operationDate: new Date(),
			settlementDate: new Date(),
			quantity: 2.333,
			grossTotal: {
				amount: 1000,
				currency: "USD",
			},
			unitCost: 1000,
			netTotal: 1000,
		},
		{
			id: "tradingid4",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Broker Name",
				},
			},
			asset: {
				id: "assetid2",
				name: "Asset Name",
				type: "BRAZILIAN_REAL_ESTATE",
			},
			operation: "ACQUISITION",
			operationDate: new Date(),
			settlementDate: new Date(),
			quantity: 1000,
			grossTotal: {
				amount: 1000,
				currency: "USD",
			},
			unitCost: 1000,
			netTotal: 1000,
		},
		{
			id: "tradingid5",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "a3e06e2a608e4e179092a3d8491c3d03",
					companyName: "Broker Name 2",
				},
			},
			asset: {
				id: "assetid1",
				name: "Asset Name 1",
				type: "BRAZILIAN_STOCK",
			},
			operation: "ACQUISITION",
			operationDate: new Date(),
			settlementDate: new Date(),
			quantity: 3,
			grossTotal: {
				amount: 123.45,
				currency: "USD",
			},
			unitCost: 123.45,
			netTotal: 123.45,
		},
	];
	beforeAll(async () => {
		({ connection: database, mongoMemoryServer } =
			await MemoryMongoConnection());
	});
	afterEach(async () => {
		database.models.tradings.collection.drop;
	});
	afterAll(async () => {
		await database.db.dropDatabase();
		await database.close();
		await mongoMemoryServer.stop();
	});
	test("It should add a new trading data", async () => {
		const tradingMongoDataGateway = new TradingMongoDataGateway(database);
		await tradingMongoDataGateway.add(tradingsData[0]);
		const tradingModel = database.models.tradings;
		const response = await tradingModel.findOne({ _id: "tradingid1" });
		expect(response?._id).toBe("tradingid1");
	});
	test("It should return all tradings for given filters.", async () => {
		const tradingModel = database.models.tradings;
		let id: string, tradingData: Omit<TradingDataMap, "id">;
		({ id, ...tradingData } = tradingsData[1]);
		await new tradingModel({ _id: id, ...tradingData }).save();
		({ id, ...tradingData } = tradingsData[2]);
		await new tradingModel({ _id: id, ...tradingData }).save();
		({ id, ...tradingData } = tradingsData[3]);
		await new tradingModel({ _id: id, ...tradingData }).save();
		({ id, ...tradingData } = tradingsData[4]);
		await new tradingModel({ _id: id, ...tradingData }).save();
		const tradingMongoDataGateway = new TradingMongoDataGateway(database);
		const response1 = await tradingMongoDataGateway.findAll(
			{
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				assetName: "Asset Name 1",
			},
			2,
		);
		expect(response1.length).toBe(2);
		expect(response1[0].asset.name).toBe("Asset Name 1");
		expect(response1[1].asset.name).toBe("Asset Name 1");
		expect(response1[0].asset.type).toBe("BRAZILIAN_STOCK");
		expect(response1[1].asset.type).toBe("BRAZILIAN_STOCK");
		const response2 = await tradingMongoDataGateway.findAll(
			{
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				brokerID: ["a3e06e2a608e4e179092a3d8491c3d03"],
			},
			2,
		);
		expect(response2.length).toBe(1);
		expect(response2[0].account.broker.id).toBe(
			"a3e06e2a608e4e179092a3d8491c3d03",
		);
	});
	test("It should return the total of documents for given filters.", async () => {
		const tradingMongoDataGateway = new TradingMongoDataGateway(database);
		const total1 = await tradingMongoDataGateway.count({
			investorID: "wrongID",
		});
		expect(total1).toBe(0);
		const total2 = await tradingMongoDataGateway.count({
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			operation: ["ACQUISITION"],
		});
		expect(total2).toBe(4);
	});
	test("It should delete a trading data.", async () => {
		const tradingMongoDataGateway = new TradingMongoDataGateway(database);
		await tradingMongoDataGateway.delete(tradingsData[0].id);
		const tradingModel = database.models.tradings;
		const response = await tradingModel.findOne<{ _id: string }>({
			_id: tradingsData[0].id,
		});
		expect(response).toBeNull();
	});
});
