import { Knex } from "knex";
import knexConfig from "../knexfile";
import { KnexConnection } from "../src/modules/database/knex";
import { MongoConnection } from "../src/modules/database/mongoose";
import {
	seedCashFlows,
	seedDeposits,
	seedTradings,
} from "../src/modules/database/mongoose/seeds";

(async () => {
	const databaseName = process.env.DATABASE || "";
	const knexConnection = KnexConnection(knexConfig.development);
	await knexConnection.raw(`DROP DATABASE IF EXISTS ${databaseName}`);
	await knexConnection.raw(`CREATE DATABASE ${databaseName}`);
	await knexConnection.raw(`USE ${databaseName}`);
	await knexConnection.migrate.latest();
	await knexConnection.seed.run();
	await knexConnection.destroy();
	const mongoConnection = await MongoConnection(databaseName);
	await mongoConnection.db.dropDatabase();
	await seedCashFlows(mongoConnection);
	await seedDeposits(mongoConnection);
	await seedTradings(mongoConnection);
	await mongoConnection.close();
})();
