import { Knex } from "knex";
import { AssetKnexDataGateway } from "../../../asset/data-gateway";
import { BrazilianCompanyKnexDataGateway } from "../../../brazilian-company/data-gateway";
import { CDBKnexDataGateway } from "../../../cdb/data-gateway";
import { cdbTypes } from "../../../cdb/domain/CDBType";
import { Index } from "../../../indexes/Index";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(CDBKnexDataGateway.cdbTableName, (table) => {
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
		table.enum("type", cdbTypes).notNullable();
		table.enum("index", ((): Index[] => ["CDI", "IPCA", "Selic", "IGP"])());
		table.float("interestRate");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(CDBKnexDataGateway.cdbTableName);
}
