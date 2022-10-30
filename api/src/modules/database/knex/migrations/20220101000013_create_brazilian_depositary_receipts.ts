import { Knex } from "knex";
import { AssetKnexDataGateway } from "../../../asset/data-gateway";
import { BDRKnexDataGateway } from "../../../brazilian-depositary-receipt/data-gateway";
import { CompanyKnexDataGateway } from "../../../company/data-gateway";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(BDRKnexDataGateway.bdrTableName, (table) => {
		table
			.string("id")
			.primary()
			.notNullable()
			.index()
			.references("id")
			.inTable(AssetKnexDataGateway.assetTableName);
		table
			.string("companyID")
			.notNullable()
			.index()
			.references("id")
			.inTable(CompanyKnexDataGateway.companyTableName);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(BDRKnexDataGateway.bdrTableName);
}
