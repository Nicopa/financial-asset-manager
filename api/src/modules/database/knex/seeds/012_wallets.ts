import { Knex } from "knex";
import { WalletKnexRepository } from "../../../wallet/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(WalletKnexRepository.walletTableName).del();

	// Inserts seed entries
	await knex(WalletKnexRepository.walletTableName).insert([
		{
			id: "7bce35a2cfa048dd93bba3029ab21903",
		},
	]);
}
