import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AssetNameValue } from "../../../asset/domain/asset-name/AssetName";
import { BDRDataGateway } from "../../data-gateway/BDRDataGateway";
import { BDRIDType } from "../../domain/id";

export type GetBDRsResponseModel = {
	id: BDRIDType;
	name: AssetNameValue;
}[];
export class GetBDRs implements Query<undefined, GetBDRsResponseModel> {
	constructor(private readonly bdrDataGateway: BDRDataGateway) {}
	async get(): Promise<GetBDRsResponseModel> {
		try {
			return await this.bdrDataGateway.getAll<GetBDRsResponseModel[number]>();
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
