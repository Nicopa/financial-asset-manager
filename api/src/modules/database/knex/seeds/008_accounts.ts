import { Knex } from "knex";
import { AccountKnexRepository } from "../../../account/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(AccountKnexRepository.accountTableName).del();

	// Inserts seed entries
	await knex(AccountKnexRepository.accountTableName).insert([
		{
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			BRLbalance: 5186,
			USDbalance: 0,
		},
	]);
}
