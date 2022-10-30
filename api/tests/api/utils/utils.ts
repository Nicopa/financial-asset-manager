import { Knex } from "knex";
import config from "../../../knexfile";
import { KnexConnection } from "../../../src/modules/database/knex";

export const createKnexDatabase = async (databaseName: string) => {
	const knexConnection = KnexConnection(config.testing);
	await knexConnection.raw(`DROP DATABASE IF EXISTS ${databaseName}`);
	await knexConnection.raw(`CREATE DATABASE ${databaseName}`);
	await knexConnection.raw(`USE ${databaseName}`);
	await knexConnection.migrate.latest({
		// directory: `${__dirname}/src/modules/database/knex/migrati/migrations/knex`,
		directory: config.development.migrations?.directory,
	});
	await knexConnection.seed.run({
		directory: config.development.seeds?.directory,
	});
	// await knexConnection.seed.run();
	await knexConnection.destroy();
};
export const getKnexConnection = (
	databaseName: string,
): Knex<any, unknown[]> => {
	const knexConfig = config.development;
	(knexConfig.connection as Knex.MySqlConnectionConfig).database = databaseName;
	return KnexConnection(knexConfig);
};
