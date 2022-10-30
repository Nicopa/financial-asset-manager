import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AssetNameValue } from "../../../asset/domain/asset-name/AssetName";
import { BrazilianStockDataGateway } from "../../data-gateway/BrazilianStockDataGateway";
import { BrazilianStockIDType } from "../../domain/id";

export type GetBrazilianStocksResponseModel = {
	id: BrazilianStockIDType;
	name: AssetNameValue;
}[];
export class GetBrazilianStocks
	implements Query<undefined, GetBrazilianStocksResponseModel>
{
	constructor(
		private readonly brazilianStockDataGateway: BrazilianStockDataGateway,
	) {}
	async get(): Promise<GetBrazilianStocksResponseModel> {
		try {
			return await this.brazilianStockDataGateway.getAll<
				GetBrazilianStocksResponseModel[number]
			>();
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
