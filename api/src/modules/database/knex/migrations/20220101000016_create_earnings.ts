import { Knex } from "knex";
import { AssetKnexRepository } from "../../../asset/repository";
import { CashFlowKnexRepository } from "../../../cash-flow/repository";
import { EarningTypeValue } from "../../../earning/domain/earning-type";
import { EarningKnexRepository } from "../../../earning/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		EarningKnexRepository.earningTableName,
		(table) => {
			table
				.string("id")
				.notNullable()
				.index()
				.references("id")
				.inTable(CashFlowKnexRepository.cashFlowTableName);
			table
				.string("assetID")
				.notNullable()
				.index()
				.references("id")
				.inTable(AssetKnexRepository.assetTableName);
			table
				.enum(
					"type",
					((): EarningTypeValue[] => [
						"AMORTIZATION",
						"DIVIDEND",
						"INCOME",
						"JCP",
					])(),
				)
				.notNullable();
			table.float("quantity").notNullable();
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(EarningKnexRepository.earningTableName);
}
