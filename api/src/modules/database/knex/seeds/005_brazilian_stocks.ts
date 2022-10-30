import { Knex } from "knex";
import { BrazilianStockKnexDataGateway } from "../../../brazilian-stock/data-gateway";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(BrazilianStockKnexDataGateway.brazilianStockTableName).del();

	// Inserts seed entries
	await knex(BrazilianStockKnexDataGateway.brazilianStockTableName).insert([
		{
			id: "c85f32b3d9da40bc82a6e98509e1b5ea",
			brazilianCompanyID: "d614144858454f16a4974f9ec53ffafe",
		},
		{
			id: "c5c2bbdc1c464e0dbad477b21efc625a",
			brazilianCompanyID: "4df406ecc3244b6e8943fd56670c4395",
		},
		{
			id: "3bf0e3c3a7ad4aafab845a8ea0cd2313",
			brazilianCompanyID: "e877a129243942f382ef545fd96887c9",
		},
		{
			id: "8211aa3ab9564d5a8fd30f70637b0dfc",
			brazilianCompanyID: "86132e401b2b4d1cbb9c4bb0cfbc0dbd",
		},
		{
			id: "098d31de45e84cdfa760ae239c238a60",
			brazilianCompanyID: "1000b651e74f40218a484f94b0f728e1",
		},
		{
			id: "e864b2c53c5a4fc4a5f385b29b0131b8",
			brazilianCompanyID: "d4de9d12936847869e0ca0c2d54ac7fb",
		},
		{
			id: "9234991cf4694a498033dd031389da05",
			brazilianCompanyID: "761704d895f643928da0088cd4312577",
		},
		{
			id: "08e25ec11c834ea1bbe5134b6ce5c272",
			brazilianCompanyID: "9577a48436274c9bb4d6728cb6357fca",
		},
		{
			id: "dd1103c13100409ab1e78936b2914f88",
			brazilianCompanyID: "0f3798cf6c444757bcf56a498f85f0eb",
		},
		{
			id: "c18030864d844e15a0b6d062108fc536",
			brazilianCompanyID: "0f3798cf6c444757bcf56a498f85f0eb",
		},
	]);
}
