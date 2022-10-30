import { investorDataGatewayMock } from "../../data-gateway/__mocks__/InvestorDataGatewayMock";
import { GetInvestor } from "./GetInvestor";

describe("Get Investor", () => {
	test("It should return investor id, fullname and cpf (if it exists).", async () => {
		const getInvestor = new GetInvestor(investorDataGatewayMock);
		const { fullname } = await getInvestor.get({ id: "investorid1" });
		expect(fullname).toBe(
			(await investorDataGatewayMock.getByID("investor1")).fullname,
		);
	});
});
