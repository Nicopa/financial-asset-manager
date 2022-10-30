import { Currency } from "./Currency.d";

export type Earning = {
	id: string;
	brokerName: string;
	assetName: string;
	operationDate: Date;
	settlementDate: Date;
	valueAmount: number;
	valueCurrency: Currency;
	type: EarningType;
	quantity: number;
};

export type EarningType = "AMORTIZATION" | "DIVIDEND" | "INCOME" | "JCP";
