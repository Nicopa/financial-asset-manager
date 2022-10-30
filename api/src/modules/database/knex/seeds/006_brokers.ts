import { Knex } from "knex";
import { BrokerKnexRepository } from "../../../broker/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(BrokerKnexRepository.brokerTableName).del();

	// Inserts seed entries
	await knex(BrokerKnexRepository.brokerTableName).insert([
		{ id: "1fc9e8e93b2740719c7431d20d6aa2b2" },
		{ id: "a3e06e2a608e4e179092a3d8491c3d03" },
	]);
}
