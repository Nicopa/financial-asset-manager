import { Knex } from "knex";
import { BrazilianCompanyKnexRepository } from "../../../brazilian-company/repository";
import { CompanyKnexRepository } from "../../../company/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		BrazilianCompanyKnexRepository.brazilianCompanyTableName,
		(table) => {
			table
				.string("id")
				.primary()
				.notNullable()
				.index()
				.references("id")
				.inTable(CompanyKnexRepository.companyTableName);
			table.string("cnpj").notNullable().unique();
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(
		BrazilianCompanyKnexRepository.brazilianCompanyTableName,
	);
}
