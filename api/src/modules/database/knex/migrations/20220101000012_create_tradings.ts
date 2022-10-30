import { Knex } from "knex";
import { AccountKnexRepository } from "../../../account/repository";
import { AssetKnexRepository } from "../../../asset/repository";
import { CashFlowKnexRepository } from "../../../cash-flow/repository";
import { TradingKnexRepository } from "../../../trading/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		TradingKnexRepository.tradingTableName,
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
			table
				.string("assetID")
				.notNullable()
				.index()
				.references("id")
				.inTable(AssetKnexRepository.assetTableName);
			table.enum("operation", ["ACQUISITION", "DISPOSAL"]);
			table.timestamp("operationDate").notNullable();
			table.timestamp("settlementDate").notNullable();
			table.float("quantity").notNullable();
			table
				.string("grossTotalCashFlowID")
				.notNullable()
				.references("id")
				.inTable(CashFlowKnexRepository.cashFlowTableName);
			table
				.string("feeCashFlowID")
				.references("id")
				.inTable(CashFlowKnexRepository.cashFlowTableName);
			table
				.string("brokerageFeeCashFlowID")
				.references("id")
				.inTable(CashFlowKnexRepository.cashFlowTableName);
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TradingKnexRepository.tradingTableName);
}
