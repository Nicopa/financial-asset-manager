import dotenv from "dotenv";
import { Knex } from "knex";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";
import { WalletKnexRepository } from "../repository";
import { WalletKnexDataGateway } from "./WalletKnexDataGateway";
describe("[wallet] Wallet Knex Data Gateway", () => {
	const inputs = {
		id: "7bce35a2cfa048dd93bba3029ab21903",
		walletAssets: [
			{
				id: "walletasset1",
				walletID: "7bce35a2cfa048dd93bba3029ab21903",
				assetID: "c85f32b3d9da40bc82a6e98509e1b5ea",
				quantity: 2,
				currency: "BRL",
				operationDate: new Date(),
				acquisitionTotalAmount: 100,
				createdAt: new Date(),
			},
			{
				id: "walletasset2",
				walletID: "7bce35a2cfa048dd93bba3029ab21903",
				assetID: "c5c2bbdc1c464e0dbad477b21efc625a",
				quantity: 2,
				currency: "BRL",
				operationDate: new Date(),
				acquisitionTotalAmount: 100,
				createdAt: new Date(),
			},
		],
	};
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
	test("It should return wallet data.", async () => {
		await database(WalletKnexRepository.walletAssetTableName).insert(
			inputs.walletAssets,
		);
		const walletKnexDataGateway = new WalletKnexDataGateway(database);
		const result = await walletKnexDataGateway.getByID(inputs.id);
		expect(result.assets).toHaveLength(inputs.walletAssets.length);
	});
});
