import { Knex } from "knex";

export abstract class KnexDatabase {
	protected database: Knex;
	constructor(database: Knex) {
		this.database = database;
	}
}
