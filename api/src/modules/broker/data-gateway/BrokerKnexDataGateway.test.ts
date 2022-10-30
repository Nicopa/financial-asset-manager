import { Knex } from "knex";
import { BrokerKnexDataGateway } from "./BrokerKnexDataGateway";
import dotenv from "dotenv";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("Broker Knex DataGateway", () => {
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should return all available brokers for an investor account.", async () => {
		const brokerDataGateway = new BrokerKnexDataGateway(database);
		const result = await brokerDataGateway.getAllAvailableForInvestorAccount<{
			id: string;
			tradingName: string;
		}>("7bce35a2cfa048dd93bba3029ab21903");
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});
