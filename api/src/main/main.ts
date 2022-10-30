import { KnexConnection } from "../modules/database/knex";
import { MongoConnection } from "../modules/database/mongoose";
import { Server } from "./server";
import knexConfig from "../../knexfile";
import { Knex } from "knex";

(async () => {
	const config = knexConfig.development;
	(config.connection as Knex.MySqlConnectionConfig).database =
		process.env.DATABASE;
	new Server(KnexConnection(config), await MongoConnection()).start(
		parseInt(process.env.PORT || "3000"),
	);
})();
