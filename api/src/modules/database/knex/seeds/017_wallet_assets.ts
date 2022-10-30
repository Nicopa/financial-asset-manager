import { Knex } from "knex";
import { WalletKnexRepository } from "../../../wallet/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(WalletKnexRepository.walletAssetTableName).del();

	// Inserts seed entries
	await knex(WalletKnexRepository.walletAssetTableName).insert([
		{
			id: "1114901d9fe14dd9a7fc4df78a90d14f",
			walletID: "7bce35a2cfa048dd93bba3029ab21903",
			sourceTradingID: "df77bd9cb77d408485c4626c3b74d02b",
			assetID: "3eaa1cc211824ed1b3b66cc6167a1995",
			quantity: 10,
			operationDate: new Date("2022-09-04T00:00:00"),
			createdAt: new Date(),
			currency: "BRL",
			acquisitionTotalAmount: 952.5,
			disposalTotalAmount: null,
		},
		{
			id: "33611a6885574e3ebb6efb83ab28ae7c",
			walletID: "7bce35a2cfa048dd93bba3029ab21903",
			sourceTradingID: "9abd455d2f9947a18b6e02ff6cab1f21",
			assetID: "8a6d6d33120c4f8b9e6f647470356504",
			quantity: 20,
			operationDate: new Date("2022-09-18T00:00:00"),
			createdAt: new Date(),
			currency: "BRL",
			acquisitionTotalAmount: 669.25,
			disposalTotalAmount: null,
		},
		{
			id: "bebee88faacd460ab7f1c86e944424e0",
			walletID: "7bce35a2cfa048dd93bba3029ab21903",
			sourceTradingID: "1595e9256ba54d41a317b3e8922ee50e",
			assetID: "dd1103c13100409ab1e78936b2914f88",
			quantity: 32,
			operationDate: new Date("2022-10-02T00:00:00"),
			createdAt: new Date(),
			currency: "BRL",
			acquisitionTotalAmount: 1200.5,
			disposalTotalAmount: null,
		},
		{
			id: "efbc0a09662747fb9d599dcba901636e",
			walletID: "7bce35a2cfa048dd93bba3029ab21903",
			sourceTradingID: "664f51285c89428b940a0c1ae5f57473",
			assetID: "a01408bf4ac241da8936f485e9ab3d6f",
			quantity: 2,
			operationDate: new Date("2022-09-05T00:00:00"),
			createdAt: new Date(),
			currency: "BRL",
			acquisitionTotalAmount: 2000,
			disposalTotalAmount: null,
		},
	]);
}
