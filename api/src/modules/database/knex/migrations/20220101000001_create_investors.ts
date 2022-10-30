import { Knex } from "knex";
import { InvestorKnexRepository } from "../../../investor/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		InvestorKnexRepository.investorTableName,
		(table) => {
			table.string("id").primary().notNullable();
			table.string("username").notNullable().unique();
			table.string("fullname").notNullable();
			table.string("password").notNullable();
			table.string("cpf").unique();
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(InvestorKnexRepository.investorTableName);
}
