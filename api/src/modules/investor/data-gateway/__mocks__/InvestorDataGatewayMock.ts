import { InvestorDataGateway, InvestorDataMap } from "../InvestorDataGateway";

export const investorDataGatewayMock: InvestorDataGateway = {
	getByID(id: string): Promise<InvestorDataMap> {
		return Promise.resolve({
			id,
			username: "investor1",
			fullname: "Investor 1 Fullname",
			password: "########",
		});
	},
	findByID(id: string): Promise<InvestorDataMap | undefined> {
		return Promise.resolve({
			id,
			username: "investor1",
			fullname: "Investor 1 Fullname",
			password: "########",
		});
	},
};
