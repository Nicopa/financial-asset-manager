import { Knex } from "knex";
import { AssetKnexDataGateway } from "../../../asset/data-gateway";
import { BrazilianCompanyKnexDataGateway } from "../../../brazilian-company/data-gateway";
import { ETFKnexDataGateway } from "../../../etf/data-gateway";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(ETFKnexDataGateway.etfTableName, (table) => {
		table
			.string("id")
			.primary()
			.notNullable()
			.index()
			.references("id")
			.inTable(AssetKnexDataGateway.assetTableName);
		table
			.string("brazilianCompanyID")
			.notNullable()
			.index()
			.references("id")
			.inTable(BrazilianCompanyKnexDataGateway.brazilianCompanyTableName);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(ETFKnexDataGateway.etfTableName);
}
