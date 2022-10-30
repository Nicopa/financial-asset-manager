import { Knex } from "knex";
import { CDBKnexDataGateway } from "../../../cdb/data-gateway";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(CDBKnexDataGateway.cdbTableName).del();

	// Inserts seed entries
	await knex(CDBKnexDataGateway.cdbTableName).insert([
		{
			id: "859497d98ca9435c8c749d9cc5854ce9",
			brazilianCompanyID: "98e9c3039a37400da375d3449a7260a0",
			type: "PREFIXED",
			index: null,
			interestRate: 0.12,
		},
		{
			id: "673bd1dcd831445490b1e06529a19cae",
			brazilianCompanyID: "98e9c3039a37400da375d3449a7260a0",
			type: "POSTFIXED",
			index: "IPCA",
			interestRate: 0.0821,
		},
		{
			id: "2ca3864c19064281aa7b774e9665e94d",
			brazilianCompanyID: "98e9c3039a37400da375d3449a7260a0",
			type: "POSTFIXED",
			index: "CDI",
			interestRate: 1.25,
		},
		{
			id: "a01408bf4ac241da8936f485e9ab3d6f",
			brazilianCompanyID: "98e9c3039a37400da375d3449a7260a0",
			type: "POSTFIXED",
			index: "CDI",
			interestRate: 1.24,
		},
	]);
}
