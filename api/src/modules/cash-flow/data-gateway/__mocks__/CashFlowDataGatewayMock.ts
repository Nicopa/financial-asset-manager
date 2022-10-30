import {
	CashFlowDataGateway,
	CashFlowDataMap,
	CashFlowFilters,
} from "../CashFlowDataGateway";

export const cashFlowDataGatewayMock: CashFlowDataGateway = {
	add(cashFlowData: CashFlowDataMap): Promise<void> {
		return Promise.resolve();
	},
	findAll(
		filters: CashFlowFilters,
		limit: number,
		offset?: number,
	): Promise<CashFlowDataMap[]> {
		const cashFlow: CashFlowDataMap = {
			id: "cashFlowID",
			account: {
				investorID: filters.investorID ?? "investorID",
				broker: {
					id: filters.brokerID ? filters.brokerID[0] : "brokerID",
					companyName: "Company name",
				},
			},
			value: {
				amount: filters.valueAmount ?? 100,
				currency: filters.valueCurrency ? filters.valueCurrency[0] : "BRL",
			},
			operation: filters.operation ? filters.operation[0] : "IN",
			operationDate: filters.operationDate ?? new Date(),
			settlementDate: filters.settlementDate ?? new Date(),
			createdAt: new Date(),
			source: "DEPOSIT",
		};
		return Promise.resolve(new Array(limit).fill({ ...cashFlow }));
	},
	async getByID(id: string): Promise<CashFlowDataMap> {
		const cashFlow = await this.findByID(id);
		return Promise.resolve(cashFlow!);
	},
	async findByID(id: string): Promise<CashFlowDataMap | undefined> {
		const cashFlow: CashFlowDataMap = {
			id,
			account: {
				investorID: "investorID",
				broker: {
					id: "brokerID",
					companyName: "Company name",
				},
			},
			value: {
				amount: 100,
				currency: "BRL",
			},
			operation: "IN",
			operationDate: new Date(),
			settlementDate: new Date(),
			createdAt: new Date(),
			source: "DEPOSIT",
		};
		return Promise.resolve(cashFlow);
	},
	async count(filters: CashFlowFilters): Promise<number> {
		return Promise.resolve(1);
	},
	async delete(id: string): Promise<void> {
		return Promise.resolve();
	},
};
