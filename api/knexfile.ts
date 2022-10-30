import type { Knex } from "knex";
import "dotenv/config";

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
	development: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: "root",
			password: "root",
			database: process.env.DATABASE,
		},
		asyncStackTraces: true,
		migrations: {
			extension: "ts",
			directory: `${__dirname}/src/modules/database/knex/migrations`,
		},
		seeds: {
			directory: `${__dirname}/src/modules/database/knex/seeds`,
		},
	},
	testing: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: "root",
			password: "root",
		},
		asyncStackTraces: true,
		migrations: {
			extension: "ts",
			directory: `${__dirname}/tests/migrations/knex`,
		},
		seeds: {
			directory: `${__dirname}/tests/seeds/knex`,
		},
	},

	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default config;
