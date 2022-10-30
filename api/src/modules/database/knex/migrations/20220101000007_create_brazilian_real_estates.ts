import { Knex } from "knex";
import { AssetKnexDataGateway } from "../../../asset/data-gateway";
import { BrazilianCompanyKnexDataGateway } from "../../../brazilian-company/data-gateway";
import { BrazilianRealEstateKnexDataGateway } from "../../../brazilian-real-estate/data-gateway";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		BrazilianRealEstateKnexDataGateway.brazilianRealEstateTableName,
		(table) => {
			table
				.string("id")
				.primary()
				.notNullable()
				.index()
				.references("id")
				.inTable(AssetKnexDataGateway.assetTableName);
			table
				.string("brazilianCompanyId")
				.notNullable()
				.index()
				.references("id")
				.inTable(BrazilianCompanyKnexDataGateway.brazilianCompanyTableName);
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(
		BrazilianRealEstateKnexDataGateway.brazilianRealEstateTableName,
	);
}
