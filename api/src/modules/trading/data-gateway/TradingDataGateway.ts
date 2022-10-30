import { AssetNameValue } from "../../asset/domain/asset-name/AssetName";
import { AssetTypeValue } from "../../asset/domain/asset-type/AssetType";
import { AssetIDType } from "../../asset/domain/id";
import { BrokerIDType } from "../../broker/domain/id";
import {
	DateComparisonOperator,
	NumberComparisonOperator,
} from "../../cash-flow/data-gateway";
import { CompanyNameValue } from "../../company/domain/company-name/CompanyName";
import { InvestorIDType } from "../../investor/domain/id";
import { Currency, MoneyValue } from "../../money/domain";
import { TradingOperationType } from "../domain";
import { TradingIDType } from "../domain/id";
import { QuantityValue } from "../domain/quantity";

export type TradingDataMap = {
	id: TradingIDType;
	account: {
		investorID: InvestorIDType;
		broker: {
			id: BrokerIDType;
			companyName: CompanyNameValue;
		};
	};
	asset: {
		id: AssetIDType;
		name: AssetNameValue;
		type: AssetTypeValue;
	};
	operation: TradingOperationType;
	operationDate: Date;
	settlementDate: Date;
	quantity: QuantityValue;
	grossTotal: MoneyValue;
	unitCost: number;
	fee?: MoneyValue;
	brokerageFee?: MoneyValue;
	netTotal: number;
};
export type TradingFilters = {
	id?: TradingIDType;
	investorID?: InvestorIDType;
	brokerID?: BrokerIDType[];
	assetName?: AssetNameValue;
	assetType?: AssetTypeValue[];
	operation?: TradingOperationType[];
	operationDate?: Date;
	operationDateComparisonOperator?: DateComparisonOperator;
	settlementDate?: Date;
	settlementDateComparisonOperator?: DateComparisonOperator;
	currency?: Currency[];
	grossTotalAmount?: number;
	grossTotalAmountComparisonOperator?: NumberComparisonOperator;
};
export interface TradingDataGateway {
	add(tradingData: TradingDataMap): Promise<void>;
	findAll(
		filters: TradingFilters,
		limit: number,
		offset?: number,
	): Promise<TradingDataMap[]>;
	count(filters: TradingFilters): Promise<number>;
	delete(id: TradingIDType): Promise<void>;
}
