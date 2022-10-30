import { Knex } from "knex";
import { CashFlowKnexRepository } from "../../../cash-flow/repository";
import { DepositKnexRepository } from "../../../deposit/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		DepositKnexRepository.depositTableName,
		(table) => {
			table
				.string("id")
				.notNullable()
				.index()
				.references("id")
				.inTable(CashFlowKnexRepository.cashFlowTableName);
			table.string("note").nullable();
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(DepositKnexRepository.depositTableName);
}
