import { eventBrokerMock } from "../../../../core/application/event/__mocks__/EventBrokerMock";
import { UUIDProviderMock } from "../../../../core/domain/service/uuid/__mocks__/UUIDMock";
import { Investor } from "../../domain";
import { encryptionMock } from "../../domain/encryption/__mocks__/EncryptionMock";
import { UsernameValue } from "../../domain/username";
import { investorRepositoryMock } from "../../repository/__mocks__/InvestorRepositoryMock";
import { CreateInvestor, CreateInvestorRequestModel } from "./CreateInvestor";
import { CPFAlreadyExists, UsernameAlreadyExists } from "./error";

describe("Create Investor Command", () => {
	const validRequestModel: CreateInvestorRequestModel = {
		username: "tony",
		fullname: "Tony Stark",
		password: "Test!123",
		cpf: "846.806.790-34",
	};
	const uUIDProviderMock = new UUIDProviderMock();
	test("It should throw error if username already exists.", () => {
		expect.assertions(1);
		const createInvestor = new CreateInvestor(
			investorRepositoryMock,
			uUIDProviderMock,
			encryptionMock,
			eventBrokerMock,
		);
		return expect(
			createInvestor.execute(validRequestModel),
		).rejects.toBeInstanceOf(UsernameAlreadyExists);
	});
	test("It should throw error if CPF already exists.", () => {
		expect.assertions(1);
		const createInvestor = new CreateInvestor(
			{
				...investorRepositoryMock,
				findByUsername(username: UsernameValue): Promise<Investor | undefined> {
					return Promise.resolve(undefined);
				},
			},
			uUIDProviderMock,
			encryptionMock,
			eventBrokerMock,
		);
		return expect(
			createInvestor.execute(validRequestModel),
		).rejects.toBeInstanceOf(CPFAlreadyExists);
	});
	test("It should not throw error if executed with valid data.", () => {
		const createInvestor = new CreateInvestor(
			{
				...investorRepositoryMock,
				findByUsername(username: string): Promise<Investor | undefined> {
					return Promise.resolve(undefined);
				},
				findByCPF(cpf: string): Promise<Investor | undefined> {
					return Promise.resolve(undefined);
				},
			},
			uUIDProviderMock,
			encryptionMock,
			eventBrokerMock,
		);
		return expect(
			createInvestor.execute(validRequestModel),
		).resolves.not.toThrowError();
	});
});
