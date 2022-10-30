import { Currency } from "./Currency.d";

export type Trading = {
	id: string;
	brokerName: string;
	assetName: string;
	operation: TradingOperation;
	operationDate: Date;
	settlementDate: Date;
	quantity: number;
	grossTotalAmount: number;
	grossTotalCurrency: Currency;
	unitCost: number;
	netTotal: number;
	feeAmount?: number | null;
	feeCurrency?: Currency | null;
	brokerageFeeAmount?: number | null;
	brokerageFeeCurrency?: Currency | null;
};

export type TradingOperation = "ACQUISITION" | "DISPOSAL";
