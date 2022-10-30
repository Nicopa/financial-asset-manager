import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AssetNameValue } from "../../../asset/domain/asset-name/AssetName";
import { ETFDataGateway } from "../../data-gateway/ETFDataGateway";
import { ETFIDType } from "../../domain/id";

export type GetETFsResponseModel = {
	id: ETFIDType;
	name: AssetNameValue;
}[];
export class GetETFs implements Query<undefined, GetETFsResponseModel> {
	constructor(private readonly etfDataGateway: ETFDataGateway) {}
	async get(): Promise<GetETFsResponseModel> {
		try {
			return await this.etfDataGateway.getAll<GetETFsResponseModel[number]>();
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
