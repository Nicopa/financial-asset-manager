import { CashFlowFilters } from "../../data-gateway";
import { cashFlowDataGatewayMock } from "../../data-gateway/__mocks__/CashFlowDataGatewayMock";
import { GetCashFlows } from "./GetCashFlows";

describe("Get Cash Flows", () => {
	test("It should return cash flow data if requested with valid data.", async () => {
		const getCashFlows = new GetCashFlows({
			...cashFlowDataGatewayMock,
			count: async (filters: CashFlowFilters): Promise<number> => {
				return Promise.resolve(2);
			},
		});
		const response = await getCashFlows.get({
			filters: {
				investorID: "investorid1",
				brokerID: ["brokerid1"],
				valueCurrency: ["USD"],
			},
			limit: 2,
		});
		expect(response.total).toBe(2);
		expect(response.results).toBeInstanceOf(Array);
		expect(response.results.length).toBe(2);
		expect(response.results[0].broker.id).toBe("brokerid1");
		expect(response.results[1].broker.id).toBe("brokerid1");
		expect(response.results[0].value.currency).toBe("USD");
		expect(response.results[1].value.currency).toBe("USD");
	});
});
