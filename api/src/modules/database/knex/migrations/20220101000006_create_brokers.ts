import { Knex } from "knex";
import { BrazilianCompanyKnexDataGateway } from "../../../brazilian-company/data-gateway";
import { BrokerKnexRepository } from "../../../broker/repository";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		BrokerKnexRepository.brokerTableName,
		(table) => {
			table
				.string("id")
				.primary()
				.notNullable()
				.index()
				.references("id")
				.inTable(BrazilianCompanyKnexDataGateway.brazilianCompanyTableName);
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(BrokerKnexRepository.brokerTableName);
}
