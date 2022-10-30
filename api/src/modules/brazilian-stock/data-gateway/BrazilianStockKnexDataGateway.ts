import { AssetKnexDataGateway } from "../../asset/data-gateway";
import { KnexDatabase } from "../../database/knex";
import { BrazilianStockDataGateway } from "./BrazilianStockDataGateway";

export class BrazilianStockKnexDataGateway
	extends KnexDatabase
	implements BrazilianStockDataGateway
{
	public static readonly brazilianStockTableName = "brazilian-stocks";
	async getAll<T extends {}>(): Promise<T[]> {
		const brazilianStocks = await this.database<T>(
			BrazilianStockKnexDataGateway.brazilianStockTableName,
		)
			.join(
				AssetKnexDataGateway.assetTableName,
				AssetKnexDataGateway.assetTableName + ".id",
				BrazilianStockKnexDataGateway.brazilianStockTableName + ".id",
			)
			.select(
				this.database
					.ref("id")
					.withSchema(BrazilianStockKnexDataGateway.brazilianStockTableName),
				this.database
					.ref("name")
					.withSchema(AssetKnexDataGateway.assetTableName),
			);
		return brazilianStocks as T[];
	}
}
