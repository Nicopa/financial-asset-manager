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
import { EarningTypeValue } from "../domain/earning-type";
import { EarningIDType } from "../domain/id";
import { QuantityValue } from "../domain/quantity";

export type EarningDataMap = {
	id: EarningIDType;
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
	type: EarningTypeValue;
	value: MoneyValue;
	quantity: QuantityValue;
	operationDate: Date;
	settlementDate: Date;
	createdAt: Date;
};
export type EarningFilters = {
	id?: EarningIDType;
	investorID?: InvestorIDType;
	brokerID?: BrokerIDType[];
	assetName?: AssetNameValue;
	assetType?: AssetTypeValue[];
	operationDate?: Date;
	operationDateComparisonOperator?: DateComparisonOperator;
	settlementDate?: Date;
	settlementDateComparisonOperator?: DateComparisonOperator;
	valueAmount?: number;
	valueAmountComparisonOperator?: NumberComparisonOperator;
	valueCurrency?: Currency[];
	type?: EarningTypeValue[];
	quantity?: QuantityValue;
	quantityComparisonOperator?: NumberComparisonOperator;
};
export interface EarningDataGateway {
	add(data: EarningDataMap): Promise<void>;
	findAll(
		filters: EarningFilters,
		limit: number,
		offset?: number,
	): Promise<EarningDataMap[]>;
	count(filters: EarningFilters): Promise<number>;
	delete(id: EarningIDType): Promise<void>;
}
