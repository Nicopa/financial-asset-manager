import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AssetNameValue } from "../../../asset/domain/asset-name/AssetName";
import { AssetTypeValue } from "../../../asset/domain/asset-type/AssetType";
import { CompanyNameValue } from "../../../company/domain/company-name/CompanyName";
import { MoneyValue } from "../../../money/domain";
import { TradingDataGateway, TradingFilters } from "../../data-gateway";
import { TradingOperationType } from "../../domain";
import { TradingIDType } from "../../domain/id";
import { QuantityValue } from "../../domain/quantity";

export type GetTradingsRequestModel = {
	filters: TradingFilters;
	limit?: number;
	offset?: number;
};
export type GetTradingsResponseModel = {
	total: number;
	results: {
		id: TradingIDType;
		broker: {
			companyName: CompanyNameValue;
		};
		asset: {
			name: AssetNameValue;
			type: AssetTypeValue;
		};
		operation: TradingOperationType;
		operationDate: Date;
		settlementDate: Date;
		quantity: QuantityValue;
		grossTotal: MoneyValue;
		unitCost: MoneyValue;
		fee?: MoneyValue;
		brokerageFee?: MoneyValue;
		netTotal: MoneyValue;
	}[];
};
export class GetTradings
	implements Query<GetTradingsRequestModel, GetTradingsResponseModel>
{
	constructor(private readonly tradingDataGateway: TradingDataGateway) {}
	async get({
		filters,
		limit,
		offset,
	}: GetTradingsRequestModel): Promise<GetTradingsResponseModel> {
		try {
			if (!limit) limit = 5;
			if (limit > 50) limit = 50;
			if (!offset) offset = 0;
			const tradings = await this.tradingDataGateway.findAll(
				filters,
				limit,
				offset,
			);
			const total = await this.tradingDataGateway.count(filters);
			return {
				total,
				results: tradings.map((trading) => ({
					id: trading.id,
					broker: {
						companyName: trading.account.broker.companyName,
					},
					asset: {
						name: trading.asset.name,
						type: trading.asset.type,
					},
					operation: trading.operation,
					operationDate: trading.operationDate,
					settlementDate: trading.settlementDate,
					quantity: trading.quantity,
					grossTotal: trading.grossTotal,
					unitCost: {
						amount: trading.unitCost,
						currency: trading.grossTotal.currency,
					},
					fee: trading.fee,
					brokerageFee: trading.brokerageFee,
					netTotal: {
						amount: trading.netTotal,
						currency: trading.grossTotal.currency,
					},
				})),
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
