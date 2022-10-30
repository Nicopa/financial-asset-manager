import knex, { Knex } from "knex";

export function KnexConnection(config: string | Knex.Config<any>) {
	return knex(config);
}
