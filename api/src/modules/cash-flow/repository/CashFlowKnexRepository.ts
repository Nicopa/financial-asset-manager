import { BrokerIDType } from "../../broker/domain/id";
import { InvestorIDType } from "../../investor/domain/id";
import { Currency } from "../../money/domain";
import { CashFlowOperationType } from "../domain";
import { CashFlowIDType } from "../domain/id";

export type CashFlowDataMap = {
	id: CashFlowIDType;
	investorID: InvestorIDType;
	brokerID: BrokerIDType;
	valueAmount: number;
	valueCurrency: Currency;
	operation: CashFlowOperationType;
	operationDate: Date;
	settlementDate: Date;
	createdAt: Date;
};
export class CashFlowKnexRepository {
	public static readonly cashFlowTableName = "cash-flows";
}
