import { Knex } from "knex";
import { InvestorKnexRepository } from "../../../investor/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(InvestorKnexRepository.investorTableName).del();

	// Inserts seed entries
	await knex(InvestorKnexRepository.investorTableName).insert([
		{
			id: "7bce35a2cfa048dd93bba3029ab21903",
			username: "testinguser",
			fullname: "Testing User",
			cpf: "000.000.000-00",
			password:
				"199c55dcd0fc08f84635221ecb37f06c1ccf88006d8b74f19ef4688bd508885b", //Test!123
		},
	]);
}
