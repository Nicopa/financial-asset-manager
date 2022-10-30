import { Knex } from "knex";
import { CompanyKnexRepository } from "../../../company/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		CompanyKnexRepository.companyTableName,
		(table) => {
			table.string("id").primary().notNullable();
			table.string("companyName").notNullable();
			table.string("tradingName").notNullable();
			table.binary("thumbnail").nullable();
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(CompanyKnexRepository.companyTableName);
}
