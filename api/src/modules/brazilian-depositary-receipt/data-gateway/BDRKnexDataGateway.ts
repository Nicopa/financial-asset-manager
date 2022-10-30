import { AssetKnexDataGateway } from "../../asset/data-gateway";
import { KnexDatabase } from "../../database/knex";
import { BDRDataGateway } from "./BDRDataGateway";

export class BDRKnexDataGateway extends KnexDatabase implements BDRDataGateway {
	public static readonly bdrTableName = "brazilian-depositary-receipts";
	async getAll<T extends {}>(): Promise<T[]> {
		const bdrs = await this.database<T>(BDRKnexDataGateway.bdrTableName)
			.join(
				AssetKnexDataGateway.assetTableName,
				AssetKnexDataGateway.assetTableName + ".id",
				BDRKnexDataGateway.bdrTableName + ".id",
			)
			.select(
				this.database.ref("id").withSchema(BDRKnexDataGateway.bdrTableName),
				this.database
					.ref("name")
					.withSchema(AssetKnexDataGateway.assetTableName),
			);
		return bdrs as T[];
	}
}
