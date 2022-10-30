import { AssetKnexDataGateway } from "../../asset/data-gateway";
import { KnexDatabase } from "../../database/knex";
import { ETFDataGateway } from "./ETFDataGateway";

export class ETFKnexDataGateway extends KnexDatabase implements ETFDataGateway {
	public static readonly etfTableName = "exchange-traded-funds";
	async getAll<T extends {}>(): Promise<T[]> {
		const etfs = await this.database<T>(ETFKnexDataGateway.etfTableName)
			.join(
				AssetKnexDataGateway.assetTableName,
				AssetKnexDataGateway.assetTableName + ".id",
				ETFKnexDataGateway.etfTableName + ".id",
			)
			.select(
				this.database.ref("id").withSchema(ETFKnexDataGateway.etfTableName),
				this.database
					.ref("name")
					.withSchema(AssetKnexDataGateway.assetTableName),
			);
		return etfs as T[];
	}
}
