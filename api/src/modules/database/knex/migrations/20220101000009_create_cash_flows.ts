import { Knex } from "knex";
import { AccountKnexRepository } from "../../../account/repository";
import { CashFlowKnexRepository } from "../../../cash-flow/repository";
import { Currency } from "../../../money/domain";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		CashFlowKnexRepository.cashFlowTableName,
		(table) => {
			table.string("id").primary().notNullable();
			table
				.string("investorID")
				.notNullable()
				.index()
				.references("investorID")
				.inTable(AccountKnexRepository.accountTableName);
			table
				.string("brokerID")
				.notNullable()
				.index()
				.references("brokerID")
				.inTable(AccountKnexRepository.accountTableName);
			table.float("valueAmount").notNullable();
			table
				.enum("valueCurrency", ((): Currency[] => ["BRL", "USD"])())
				.notNullable();
			table.enum("operation", ["IN", "OUT"]).notNullable();
			table.timestamp("operationDate").notNullable();
			table.timestamp("settlementDate").notNullable();
			table.timestamp("createdAt").notNullable();
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(CashFlowKnexRepository.cashFlowTableName);
}
