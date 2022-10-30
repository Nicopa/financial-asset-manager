import dotenv from "dotenv";
import { Knex } from "knex";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";
import { AccountKnexDataGateway } from "./AccountKnexDataGateway";

describe("Account Knex Data Gateway", () => {
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
	test("It should return data of all accounts by investor ID.", async () => {
		const accountKnexDataGateway = new AccountKnexDataGateway(database);
		const data = await accountKnexDataGateway.getAllByInvestorID(
			"7bce35a2cfa048dd93bba3029ab21903",
		);
		expect(data).toBeInstanceOf(Array);
		expect(data.length).toBe(1);
		expect(data[0].brokerID).toBe("1fc9e8e93b2740719c7431d20d6aa2b2");
		expect(data[0].thumbnail?.length).toBeGreaterThan(1);
		expect(data[0].BRLbalance).toBe(0);
		expect(data[0].USDbalance).toBe(0);
	});
});
