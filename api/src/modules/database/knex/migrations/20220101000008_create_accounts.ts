import { Knex } from "knex";
import { AccountKnexRepository } from "../../../account/repository";
import { BrokerKnexRepository } from "../../../broker/repository";
import { InvestorKnexRepository } from "../../../investor/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		AccountKnexRepository.accountTableName,
		(table) => {
			table
				.string("investorID")
				.notNullable()
				.index()
				.references("id")
				.inTable(InvestorKnexRepository.investorTableName);
			table
				.string("brokerID")
				.notNullable()
				.index()
				.references("id")
				.inTable(BrokerKnexRepository.brokerTableName);
			table.float("BRLbalance").notNullable().defaultTo(0);
			table.float("USDbalance").notNullable().defaultTo(0);
			table.primary(["investorID", "brokerID"]);
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(AccountKnexRepository.accountTableName);
}
