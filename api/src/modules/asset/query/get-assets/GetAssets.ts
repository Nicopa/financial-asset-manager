import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AssetDataGateway } from "../../data-gateway";
import { AssetIDType } from "../../domain/id";

export type GetAssetsRequestModel = undefined;
export type GetAssetsResponseModel = {
	id: AssetIDType;
	name: string;
}[];
export class GetAssets
	implements Query<GetAssetsRequestModel, GetAssetsResponseModel>
{
	constructor(private readonly assetDataGateway: AssetDataGateway) {}
	async get(): Promise<GetAssetsResponseModel> {
		try {
			return (await this.assetDataGateway.getAll()).map((asset) => ({
				id: asset.id,
				name: asset.name,
			}));
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
