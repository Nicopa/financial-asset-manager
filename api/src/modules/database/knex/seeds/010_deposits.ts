import { Knex } from "knex";
import { DepositKnexRepository } from "../../../deposit/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(DepositKnexRepository.depositTableName).del();

	// Inserts seed entries
	await knex(DepositKnexRepository.depositTableName).insert([
		{
			id: "d9ce0396607e408fa925fc691ab9360f",
			note: null,
		},
	]);
}
