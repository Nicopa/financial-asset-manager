import dotenv from "dotenv";
import { Knex } from "knex";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";
import { AssetKnexDataGateway } from "./AssetKnexDataGateway";
import { IDNotFound } from "./error";

describe("[asset] Asset Knex Data Gateway", () => {
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should throw error when getting data by ID that doesn't exist.", async () => {
		const assetKnexDataGateway = new AssetKnexDataGateway(database);
		await expect(
			assetKnexDataGateway.getByID("WrongId"),
		).rejects.toBeInstanceOf(IDNotFound);
	});
	test("It should return data of an asset by ID", async () => {
		const assetKnexDataGateway = new AssetKnexDataGateway(database);
		const data = await assetKnexDataGateway.getByID(
			"3bf0e3c3a7ad4aafab845a8ea0cd2313",
		);
		expect(data.id).toBe("3bf0e3c3a7ad4aafab845a8ea0cd2313");
	});
	test("It should return undefined when it doesn't find an asset data by ID", async () => {
		const assetKnexDataGateway = new AssetKnexDataGateway(database);
		await expect(assetKnexDataGateway.findByID("WrongID")).resolves.toBe(
			undefined,
		);
	});
	test("It should find an asset by ID", async () => {
		const assetKnexDataGateway = new AssetKnexDataGateway(database);
		const data = await assetKnexDataGateway.findByID(
			"3bf0e3c3a7ad4aafab845a8ea0cd2313",
		);
		expect(data).not.toBe(undefined);
		expect(data?.id).toBe("3bf0e3c3a7ad4aafab845a8ea0cd2313");
	});
	test("It should return all assets.", async () => {
		const assetKnexDataGateway = new AssetKnexDataGateway(database);
		const data = await assetKnexDataGateway.getAll();
		expect(data).toBeInstanceOf(Array);
		expect(data.length).toBe(22);
	});
	test("It should return assets by name.", async () => {
		const assetKnexDataGateway = new AssetKnexDataGateway(database);
		let data = await assetKnexDataGateway.findAllByName("PETR");
		expect(data).toBeInstanceOf(Array);
		expect(data.length).toBe(2);
		data = await assetKnexDataGateway.findAllByName("bov");
		expect(data).toBeInstanceOf(Array);
		expect(data.length).toBe(1);
	});
	test("It should update last price and updated date.", async () => {
		const assetKnexDataGateway = new AssetKnexDataGateway(database);
		await assetKnexDataGateway.updateLastPrice(
			"3eaa1cc211824ed1b3b66cc6167a1995",
			100,
		);
		const data = await assetKnexDataGateway.findByID(
			"3eaa1cc211824ed1b3b66cc6167a1995",
		);
		expect(data?.lastPrice).toBe(100);
		expect(data?.updatedAt.getTime()).toBeGreaterThanOrEqual(
			new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate() - 1,
			).getTime(),
		);
	});
});
