import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AssetDataGateway } from "../../data-gateway";
import { AssetIDType } from "../../domain/id";

export type GetAssetsByNameRequestModel = {
	name: string;
};
export type GetAssetsByNameResponseModel = {
	id: AssetIDType;
	name: string;
}[];
export class GetAssetsByName
	implements Query<GetAssetsByNameRequestModel, GetAssetsByNameResponseModel>
{
	constructor(private readonly assetDataGateway: AssetDataGateway) {}
	async get({
		name,
	}: GetAssetsByNameRequestModel): Promise<GetAssetsByNameResponseModel> {
		try {
			if (!name) return [];
			return (await this.assetDataGateway.findAllByName(name)).map((asset) => ({
				id: asset.id,
				name: asset.name,
			}));
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
