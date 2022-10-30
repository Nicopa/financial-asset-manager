import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MemoryMongoConnection } from "../../../../tests/databases/mongodb/MemoryMongoConnection";
import { CashFlowDataMap } from "./CashFlowDataGateway";
import { CashFlowMongoDataGateway } from "./CashFlowMongoDataGateway";

describe("[cash-flow] Cash Flow Mongo Data Gateway", () => {
	dotenv.config();
	let database: mongoose.Connection;
	let mongoMemoryServer: MongoMemoryServer;
	20000;
	const cashFlowsData: CashFlowDataMap[] = [
		{
			id: "cashflowid1",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Broker Name",
				},
			},
			source: "TRADING",
			value: {
				amount: 555.5,
				currency: "USD",
			},
			operation: "OUT",
			operationDate: new Date(),
			settlementDate: new Date(),
			createdAt: new Date(),
		},
		{
			id: "cashflowid2",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Broker Name",
				},
			},
			source: "TRADING",
			value: {
				amount: 1000.5,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date(),
			settlementDate: new Date(),
			createdAt: new Date(),
		},
		{
			id: "cashflowid3",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Broker Name",
				},
			},
			source: "FEE",
			value: {
				amount: 1.5,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date(),
			settlementDate: new Date(),
			createdAt: new Date(),
		},
		{
			id: "cashflowid4",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Broker Name",
				},
			},
			source: "FEE",
			value: {
				amount: 0.5,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date(),
			settlementDate: new Date(),
			createdAt: new Date(),
		},
		{
			id: "cashflowid5",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "a3e06e2a608e4e179092a3d8491c3d03",
					companyName: "Broker Name",
				},
			},
			source: "BROKERAGE_FEE",
			value: {
				amount: 0.5,
				currency: "USD",
			},
			operation: "OUT",
			operationDate: new Date(),
			settlementDate: new Date(),
			createdAt: new Date(),
		},
	];
	beforeAll(async () => {
		({ connection: database, mongoMemoryServer } =
			await MemoryMongoConnection());
		await database.createCollection(
			CashFlowMongoDataGateway.cashFlowCollectionName,
		);
	});
	afterAll(async () => {
		await database.db.dropDatabase();
		await database.close();
		await mongoMemoryServer.stop();
	});
	test("It should add a new cash flow data", async () => {
		const cashFlowMongoDataGateway = new CashFlowMongoDataGateway(database);
		await cashFlowMongoDataGateway.add(cashFlowsData[0]);
		const cashFlowModel = database.models["cash-flows"];
		const response = await cashFlowModel.findOne({ _id: "cashflowid1" });
		expect(response?.id).toBe("cashflowid1");
	});
	test("It should return all cash flows for given filters.", async () => {
		const cashFlowModel = database.models["cash-flows"];
		const { id: id1, ...data1 } = cashFlowsData[1];
		await new cashFlowModel({ _id: id1, ...data1 }).save();
		const { id: id2, ...data2 } = cashFlowsData[2];
		await new cashFlowModel({ _id: id2, ...data2 }).save();
		const { id: id3, ...data3 } = cashFlowsData[3];
		await new cashFlowModel({ _id: id3, ...data3 }).save();
		const { id: id4, ...data4 } = cashFlowsData[4];
		await new cashFlowModel({ _id: id4, ...data4 }).save();
		const cashFlowMongoDataGateway = new CashFlowMongoDataGateway(database);
		const response1 = await cashFlowMongoDataGateway.findAll(
			{
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				valueCurrency: ["BRL"],
			},
			2,
		);
		expect(response1.length).toBe(2);
		expect(response1[0].value.currency).toBe("BRL");
		const response2 = await cashFlowMongoDataGateway.findAll(
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
		const cashFlowMongoDataGateway = new CashFlowMongoDataGateway(database);
		const total1 = await cashFlowMongoDataGateway.count({
			investorID: "wrongID",
		});
		expect(total1).toBe(0);
		const total2 = await cashFlowMongoDataGateway.count({
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			valueCurrency: ["BRL"],
		});
		expect(total2).toBe(3);
	});
});
