import { Knex } from "knex";
import { ETFKnexDataGateway } from "../../../etf/data-gateway";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(ETFKnexDataGateway.etfTableName).del();

	// Inserts seed entries
	await knex(ETFKnexDataGateway.etfTableName).insert([
		{
			id: "333b9e551d8f492cabc9c0c23c467cbf",
			brazilianCompanyID: "cb910b2694f845af9431d68a491d876f",
		},
		{
			id: "3eaa1cc211824ed1b3b66cc6167a1995",
			brazilianCompanyID: "c73a6c2c6fdc44d3b3ae0f2fa603bc40",
		},
	]);
}
