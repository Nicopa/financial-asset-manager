import { Knex } from "knex";
import dotenv from "dotenv";
import { InvestorKnexDataGateway } from "./InvestorKnexDataGateway";
import { IDNotFound } from "./error";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("[investor] Investor Data Gateway", () => {
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
	test("It should throw error when getting data by ID that doesn't exist.", async () => {
		const investorKnexDataGateway = new InvestorKnexDataGateway(database);
		await expect(
			investorKnexDataGateway.getByID("WrongId"),
		).rejects.toBeInstanceOf(IDNotFound);
	});
	test("It should return data of an investor by ID", async () => {
		const investorKnexDataGateway = new InvestorKnexDataGateway(database);
		const data = await investorKnexDataGateway.getByID(
			"7bce35a2cfa048dd93bba3029ab21903",
		);
		expect(data.id).toBe("7bce35a2cfa048dd93bba3029ab21903");
	});
	test("It should return undefined when it doesn't find an investor data by ID", async () => {
		const investorKnexDataGateway = new InvestorKnexDataGateway(database);
		await expect(investorKnexDataGateway.findByID("WrongID")).resolves.toBe(
			undefined,
		);
	});
	test("It should find an investor by ID", async () => {
		const investorKnexDataGateway = new InvestorKnexDataGateway(database);
		const data = await investorKnexDataGateway.findByID(
			"7bce35a2cfa048dd93bba3029ab21903",
		);
		expect(data).not.toBe(undefined);
		expect(data?.id).toBe("7bce35a2cfa048dd93bba3029ab21903");
	});
});
