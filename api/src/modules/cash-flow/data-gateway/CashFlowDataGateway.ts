import { BrokerIDType } from "../../broker/domain/id";
import { CompanyNameValue } from "../../company/domain/company-name/CompanyName";
import { InvestorIDType } from "../../investor/domain/id";
import { Currency, MoneyValue } from "../../money/domain";
import { CashFlowOperationType, CashFlowSource } from "../domain";
import { CashFlowIDType } from "../domain/id";

export type CashFlowDataMap = {
	id: CashFlowIDType;
	account: {
		investorID: InvestorIDType;
		broker: {
			id: BrokerIDType;
			companyName: CompanyNameValue;
		};
	};
	source: CashFlowSource;
	value: MoneyValue;
	operation: CashFlowOperationType;
	operationDate: Date;
	settlementDate: Date;
	createdAt: Date;
};
export type DateComparisonOperator = "equalTo" | "before" | "since";
export type NumberComparisonOperator =
	| "equalTo"
	| "greaterThan"
	| "lessThan"
	| "greaterThanOrEqualTo"
	| "lessThanOrEqualTo";
export type CashFlowFilters = {
	id?: CashFlowIDType;
	investorID?: InvestorIDType;
	brokerID?: BrokerIDType[];
	source?: CashFlowSource[];
	valueAmount?: number;
	valueAmountComparisonOperator?: NumberComparisonOperator;
	valueCurrency?: Currency[];
	operation?: CashFlowOperationType[];
	operationDate?: Date;
	operationDateComparisonOperator?: DateComparisonOperator;
	settlementDate?: Date;
	settlementDateComparisonOperator?: DateComparisonOperator;
};
export interface CashFlowDataGateway {
	add(cashFlowData: CashFlowDataMap): Promise<void>;
	getByID(id: CashFlowIDType): Promise<CashFlowDataMap>;
	findByID(id: CashFlowIDType): Promise<CashFlowDataMap | undefined>;
	findAll(
		filters: CashFlowFilters,
		limit: number,
		offset?: number,
	): Promise<CashFlowDataMap[]>;
	count(filters: CashFlowFilters): Promise<number>;
	delete(id: CashFlowIDType): Promise<void>;
}
