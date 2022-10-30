import { Knex } from "knex";
import { WithdrawKnexRepository } from "../../../withdraw/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(WithdrawKnexRepository.withdrawTableName).del();
}
