import { Currency } from "./Currency.d";

export type CashFlow = {
	brokerID: string;
	brokerCompanyName: string;
	operationDate: Date;
	settlementDate: Date;
	operation: CashFlowOperation;
	valueAmount: number;
	valueCurrency: Currency;
};

export type CashFlowOperation = "IN" | "OUT";
