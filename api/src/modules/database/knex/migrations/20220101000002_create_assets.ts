import { Knex } from "knex";
import { assetTypes } from "../../../asset/domain/asset-type/AssetType";
import { AssetKnexRepository } from "../../../asset/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(AssetKnexRepository.assetTableName, (table) => {
		table.string("id").primary().notNullable();
		table.string("name").notNullable();
		table.enum("type", assetTypes).notNullable();
		table.float("lastPrice").defaultTo(0);
		table
			.date("updatedAt")
			.defaultTo(new Date("2022-01-01").toISOString().slice(0, 10));
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(AssetKnexRepository.assetTableName);
}
