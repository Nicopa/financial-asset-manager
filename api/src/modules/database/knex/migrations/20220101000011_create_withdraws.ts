import { Knex } from "knex";
import { CashFlowKnexRepository } from "../../../cash-flow/repository";
import { WithdrawKnexRepository } from "../../../withdraw/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		WithdrawKnexRepository.withdrawTableName,
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
	await knex.schema.dropTableIfExists(WithdrawKnexRepository.withdrawTableName);
}
