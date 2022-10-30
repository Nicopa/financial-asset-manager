import { Knex } from "knex";
import { BDRKnexDataGateway } from "../../../brazilian-depositary-receipt/data-gateway";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(BDRKnexDataGateway.bdrTableName).del();

	// Inserts seed entries
	await knex(BDRKnexDataGateway.bdrTableName).insert([
		{
			id: "f121ebd0e089437185daf7f25f83a440",
			companyID: "c70b95647fd640969e0c04a40a6bfaf7",
		},
		{
			id: "5b01c4bafe8f4a9b88769d0622039ac8",
			companyID: "141c579ae1e641b9974e17efd8addcad",
		},
		{
			id: "8a6d6d33120c4f8b9e6f647470356504",
			companyID: "33e0b4c0ef494bf7966e18cf5a855ced",
		},
	]);
}
