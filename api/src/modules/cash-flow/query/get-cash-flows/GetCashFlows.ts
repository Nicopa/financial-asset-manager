import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { BrokerIDType } from "../../../broker/domain/id";
import { CompanyNameValue } from "../../../company/domain/company-name/CompanyName";
import { Currency } from "../../../money/domain";
import { CashFlowDataGateway, CashFlowFilters } from "../../data-gateway";
import { CashFlowOperationType, CashFlowSource } from "../../domain";
import { CashFlowIDType } from "../../domain/id";

export type GetCashFlowsRequestModel = {
	filters: CashFlowFilters;
	limit?: number;
	offset?: number;
};
export type GetCashFlowsResponseModel = {
	total: number;
	results: {
		id: CashFlowIDType;
		broker: {
			id: BrokerIDType;
			companyName: CompanyNameValue;
		};
		source: CashFlowSource;
		value: {
			amount: number;
			currency: Currency;
		};
		operation: CashFlowOperationType;
		operationDate: Date;
		settlementDate: Date;
	}[];
};
export class GetCashFlows
	implements Query<GetCashFlowsRequestModel, GetCashFlowsResponseModel>
{
	constructor(private readonly cashFlowDataGateway: CashFlowDataGateway) {}
	async get({
		filters,
		limit,
		offset,
	}: GetCashFlowsRequestModel): Promise<GetCashFlowsResponseModel> {
		try {
			if (!limit) limit = 5;
			if (limit > 50) limit = 50;
			if (!offset) offset = 0;
			const cashFlows = await this.cashFlowDataGateway.findAll(
				filters,
				limit,
				offset,
			);
			const total = await this.cashFlowDataGateway.count(filters);
			return {
				total,
				results: cashFlows.map((cashFlow) => ({
					id: cashFlow.id,
					broker: cashFlow.account.broker,
					source: cashFlow.source,
					operation: cashFlow.operation,
					operationDate: cashFlow.operationDate,
					settlementDate: cashFlow.settlementDate,
					value: cashFlow.value,
				})),
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
