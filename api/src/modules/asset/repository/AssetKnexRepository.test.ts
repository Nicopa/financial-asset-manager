import { Knex } from "knex";
import { AssetKnexRepository } from "./AssetKnexRepository";
import dotenv from "dotenv";
import { Asset } from "../domain";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("Asset Knex Repository", () => {
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
	test("It should return undefined when it doesn't find an asset by ID", async () => {
		const assetKnexRepository = new AssetKnexRepository(database);
		await expect(assetKnexRepository.findByID("anyAssetID")).resolves.toBe(
			undefined,
		);
	});
	test("It should find an asset by ID", async () => {
		const assetKnexRepository = new AssetKnexRepository(database);
		const asset = await assetKnexRepository.findByID(
			"3bf0e3c3a7ad4aafab845a8ea0cd2313",
		);
		expect(asset).toBeInstanceOf(Asset);
		expect(asset?.id.value).toBe("3bf0e3c3a7ad4aafab845a8ea0cd2313");
	});
});
