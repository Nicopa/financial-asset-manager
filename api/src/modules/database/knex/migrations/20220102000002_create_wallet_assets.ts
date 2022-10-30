import { Knex } from "knex";
import { AssetKnexRepository } from "../../../asset/repository";
import { Currency } from "../../../money/domain";
import { TradingKnexRepository } from "../../../trading/repository";
import { WalletKnexRepository } from "../../../wallet/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		WalletKnexRepository.walletAssetTableName,
		(table) => {
			table.string("id").primary();
			table
				.string("walletID")
				.notNullable()
				.references("id")
				.inTable(WalletKnexRepository.walletTableName);
			table
				.string("sourceTradingID")
				.notNullable()
				.references("id")
				.inTable(TradingKnexRepository.tradingTableName);
			table
				.string("assetID")
				.notNullable()
				.references("id")
				.inTable(AssetKnexRepository.assetTableName);
			table.float("quantity").notNullable();
			table.timestamp("operationDate").notNullable();
			table
				.enum("currency", ((): Currency[] => ["BRL", "USD"])())
				.notNullable();
			table.float("acquisitionTotalAmount");
			table.float("disposalTotalAmount");
			table.timestamp("createdAt").notNullable();
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(
		WalletKnexRepository.walletAssetTableName,
	);
}
