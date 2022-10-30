import { AssetKnexDataGateway } from "../../asset/data-gateway";
import { KnexDatabase } from "../../database/knex";
import { CDBIDType } from "../domain/id";
import { CDBDataGateway, CDBDataMap } from "./CDBDataGateway";
import { IDNotFound } from "./error";

export class CDBKnexDataGateway extends KnexDatabase implements CDBDataGateway {
	public static readonly cdbTableName = "cdbs";
	async getByID(id: CDBIDType): Promise<CDBDataMap> {
		const cdb = await this.database<CDBDataMap>(CDBKnexDataGateway.cdbTableName)
			.join(
				AssetKnexDataGateway.assetTableName,
				AssetKnexDataGateway.assetTableName + ".id",
				CDBKnexDataGateway.cdbTableName + ".id",
			)
			.where(CDBKnexDataGateway.cdbTableName + ".id", id)
			.select(
				this.database.ref("*").withSchema(CDBKnexDataGateway.cdbTableName),
				this.database
					.ref("name")
					.withSchema(AssetKnexDataGateway.assetTableName),
				this.database
					.ref("lastPrice")
					.withSchema(AssetKnexDataGateway.assetTableName),
				this.database
					.ref("updatedAt")
					.withSchema(AssetKnexDataGateway.assetTableName),
			)
			.first();
		if (!cdb) throw new IDNotFound();
		return cdb;
	}
}
