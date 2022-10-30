import { Knex } from "knex";
import { InvestorKnexDataGateway } from "../../../investor/data-gateway";
import { WalletKnexRepository } from "../../../wallet/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		WalletKnexRepository.walletTableName,
		(table) => {
			table
				.string("id")
				.primary()
				.references("id")
				.inTable(InvestorKnexDataGateway.investorTableName);
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(WalletKnexRepository.walletTableName);
}
