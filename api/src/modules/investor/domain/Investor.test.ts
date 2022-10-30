import { UUIDProviderMock } from "../../../core/domain/service/uuid/__mocks__/UUIDMock";
import { encryptionMock } from "./encryption/__mocks__/EncryptionMock";
import { Investor, InvestorCreateParams } from "./Investor";

describe("[investor] Investor", () => {
	const validInvestorCreateParams: InvestorCreateParams = {
		username: "tony",
		fullname: "Tony Stark",
		password: "Test!123",
	};
	const uUIDProvider = new UUIDProviderMock();
	test("It should return an investor object if created with valid data.", () => {
		expect(
			Investor.create(validInvestorCreateParams, uUIDProvider, encryptionMock),
		).toBeInstanceOf(Investor);
	});
	test("It should create a domain event when created.", () => {
		const investor = Investor.create(
			validInvestorCreateParams,
			uUIDProvider,
			encryptionMock,
		);
		expect(investor.dispatchEvents().length).toBe(1);
	});
});
