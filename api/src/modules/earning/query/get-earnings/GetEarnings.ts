import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AssetNameValue } from "../../../asset/domain/asset-name/AssetName";
import { AssetTypeValue } from "../../../asset/domain/asset-type/AssetType";
import { CompanyNameValue } from "../../../company/domain/company-name/CompanyName";
import { MoneyValue } from "../../../money/domain";
import { EarningDataGateway, EarningFilters } from "../../data-gateway";
import { EarningTypeValue } from "../../domain/earning-type";
import { EarningIDType } from "../../domain/id";
import { QuantityValue } from "../../domain/quantity";

export type GetEarningsRequestModel = {
	filters: EarningFilters;
	limit?: number;
	offset?: number;
};
export type GetEarningsResponseModel = {
	total: number;
	results: {
		id: EarningIDType;
		broker: {
			companyName: CompanyNameValue;
		};
		asset: {
			name: AssetNameValue;
			type: AssetTypeValue;
		};
		operationDate: Date;
		settlementDate: Date;
		value: MoneyValue;
		type: EarningTypeValue;
		quantity: QuantityValue;
	}[];
};
export class GetEarnings
	implements Query<GetEarningsRequestModel, GetEarningsResponseModel>
{
	constructor(private readonly earningDataGateway: EarningDataGateway) {}
	async get({
		filters,
		limit,
		offset,
	}: GetEarningsRequestModel): Promise<GetEarningsResponseModel> {
		try {
			if (!limit) limit = 5;
			if (limit > 50) limit = 50;
			if (!offset) offset = 0;
			const earnings = await this.earningDataGateway.findAll(
				filters,
				limit,
				offset,
			);
			const total = await this.earningDataGateway.count(filters);
			return {
				total,
				results: earnings.map((earning) => ({
					id: earning.id,
					broker: {
						companyName: earning.account.broker.companyName,
					},
					value: earning.value,
					operationDate: earning.operationDate,
					settlementDate: earning.settlementDate,
					asset: {
						name: earning.asset.name,
						type: earning.asset.type,
					},
					type: earning.type,
					quantity: earning.quantity,
				})),
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
