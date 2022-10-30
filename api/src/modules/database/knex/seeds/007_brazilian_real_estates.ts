import { Knex } from "knex";
import { BrazilianRealEstateKnexDataGateway } from "../../../brazilian-real-estate/data-gateway";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(
		BrazilianRealEstateKnexDataGateway.brazilianRealEstateTableName,
	).del();

	// Inserts seed entries
	await knex(
		BrazilianRealEstateKnexDataGateway.brazilianRealEstateTableName,
	).insert([
		{
			id: "13770066eac241338b7c793efadd0302",
			brazilianCompanyId: "f3b28181f00f499c86a4d6a87a13a1ed",
		},
		{
			id: "feb28ecaa77a4e51940bf96b5b5183db",
			brazilianCompanyId: "5524c73873e84a4580a730be47e48b96",
		},
		{
			id: "5b0c0cdd57e1401eaf2dd7edd229d6c3",
			brazilianCompanyId: "3aafe1da200a48018079ebc7f05ae0bf",
		},
		{
			id: "eb9b3abca1794f67aedda4c2ea57ccc7",
			brazilianCompanyId: "538a6fc768664ac789f6b707eecd8eb4",
		},
		{
			id: "c97226ed270a4ca09da8999f8f2415fe",
			brazilianCompanyId: "357b76758a2242e08cb95bb873e0dd05",
		},
		{
			id: "89540adaf09b4ba8820686604463999a",
			brazilianCompanyId: "759466daa1594fd685dc5708747ed9b1",
		},
		{
			id: "e25ea5adfcec49319a9001b9cb80d697",
			brazilianCompanyId: "50006d1d5f1642dcb9b976ab7a421e53",
		},
		{
			id: "446ab3b81eb24177a63e27d4e95907d2",
			brazilianCompanyId: "e7d27026e3a24551abf9ae159a738a62",
		},
	]);
}
