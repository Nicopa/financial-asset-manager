import { Knex } from "knex";
import dotenv from "dotenv";
import { Investor, InvestorState } from "../domain";
import { InvestorNotFound } from "./error";
import { InvestorKnexRepository } from "./InvestorKnexRepository";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";

describe("[investor] Investor Knex Repository", () => {
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	20000;
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should add a new investor to the database.", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		const fakeInvestor = Investor.load({
			id: "623f62083fab4030bc3c012d9d621327",
			username: "tony",
			fullname: "Tony Stark",
			password: "########",
			cpf: "000.000.000-01",
		});
		expect(
			Number(
				(
					await database(InvestorKnexRepository.investorTableName)
						.where("id", fakeInvestor.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(0);
		await investorKnexRepository.add(fakeInvestor);
		expect(
			Number(
				(
					await database(InvestorKnexRepository.investorTableName)
						.where("id", fakeInvestor.id.value)
						.count({ count: "id" })
						.first()
				)?.count,
			),
		).toBe(1);
	});
	test("It should throw error when getting by ID that doesn't exist.", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		await expect(
			investorKnexRepository.getByID("WrongId"),
		).rejects.toBeInstanceOf(InvestorNotFound);
	});
	test("It should return an investor by ID", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		const fakeInvestor = Investor.load({
			id: "977936fe425347338297b61cfa183220",
			username: "tony2",
			fullname: "Tony Stark",
			password: "########",
		});
		await investorKnexRepository.add(fakeInvestor);
		const investor = await investorKnexRepository.getByID(
			fakeInvestor.id.value,
		);
		expect(investor).toBeInstanceOf(Investor);
		expect(investor.is(fakeInvestor)).toBe(true);
		expect(investor.id.value).toBe(fakeInvestor.id.value);
	});
	test("It should return undefined when it doesn't find an investor by ID", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		await expect(investorKnexRepository.findByID("WrongID")).resolves.toBe(
			undefined,
		);
	});
	test("It should find an investor by ID", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		const fakeInvestor = Investor.load({
			id: "e32d95e035344c2692d0ae2abf917d36",
			username: "tony3",
			fullname: "Tony Stark",
			password: "########",
		});
		await investorKnexRepository.add(fakeInvestor);
		const investor = await investorKnexRepository.findByID(
			fakeInvestor.id.value,
		);
		expect(investor).toBeInstanceOf(Investor);
		expect(investor?.is(fakeInvestor));
	});
	test("It should return undefined when it doesn't find an investor by username", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		await expect(
			investorKnexRepository.findByUsername("WrongUsername"),
		).resolves.toBe(undefined);
	});
	test("It should find an investor by username", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		const fakeInvestor = Investor.load({
			id: "6686513b0cc14c8a8c2126e4ee51c115",
			username: "tony4",
			fullname: "Tony Stark",
			password: "########",
		});
		await investorKnexRepository.add(fakeInvestor);
		const investor = await investorKnexRepository.findByUsername(
			fakeInvestor.state.username.value,
		);
		expect(investor).toBeInstanceOf(Investor);
		expect(investor?.is(fakeInvestor));
	});
	test("It should return undefined when it doesn't find an investor by CPF", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		await expect(investorKnexRepository.findByCPF("WrongCPF")).resolves.toBe(
			undefined,
		);
	});
	test("It should find an investor by CPF", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		const fakeInvestor = Investor.load({
			id: "55df22a463f24690a83cd415e72ab565",
			username: "tony5",
			fullname: "Tony Stark",
			password: "########",
			cpf: "010.101.010-10",
		});
		await investorKnexRepository.add(fakeInvestor);
		const investor = await investorKnexRepository.findByCPF(
			fakeInvestor.state.cpf!.value,
		);
		expect(investor).toBeInstanceOf(Investor);
		expect(investor?.is(fakeInvestor));
	});
	test("It should update investor data.", async () => {
		const investorKnexRepository = new InvestorKnexRepository(database);
		let fakeInvestor = Investor.load({
			id: "fa9106ea1ddb4df3b35a7f06593b6208",
			username: "tony6",
			fullname: "Tony Stark",
			password: "########",
			cpf: "020.202.020-20",
		});
		await investorKnexRepository.add(fakeInvestor);
		fakeInvestor = Investor.load({
			id: "fa9106ea1ddb4df3b35a7f06593b6208",
			username: "bruce",
			fullname: "Bruce Banner",
			password: "anypassword",
			cpf: "030.303.030-30",
		});
		await investorKnexRepository.update(fakeInvestor);

		const updatedInvestor = await database<InvestorState>(
			InvestorKnexRepository.investorTableName,
		)
			.where("id", fakeInvestor.id.value)
			.first();
		expect(updatedInvestor?.username).toBe(fakeInvestor.state.username.value);
		expect(updatedInvestor?.fullname).toBe(fakeInvestor.state.fullname.value);
		expect(updatedInvestor?.password).toBe(fakeInvestor.state.password.value);
		expect(updatedInvestor?.cpf).toBe(fakeInvestor.state.cpf?.value);
	});
});
