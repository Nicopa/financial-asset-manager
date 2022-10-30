import { AssetKnexDataGateway } from "../../asset/data-gateway";
import { KnexDatabase } from "../../database/knex";
import { WalletIDType } from "../domain/id";
import { WalletNotFound } from "./error";
import {
	WalletAssetDataMap,
	WalletDataGateway,
	WalletDataMap,
} from "./WalletDataGateway";

export class WalletKnexDataGateway
	extends KnexDatabase
	implements WalletDataGateway
{
	public static readonly walletTableName = "wallets";
	public static readonly walletAssetTableName = "wallet-assets";
	async getByID(id: WalletIDType): Promise<WalletDataMap> {
		const wallet = await this.database
			.select("*")
			.from<Omit<WalletDataMap, "assets">>(
				WalletKnexDataGateway.walletTableName,
			)
			.where("id", id)
			.first();
		if (!wallet) throw new WalletNotFound();
		const assets = await this.database<WalletAssetDataMap>(
			WalletKnexDataGateway.walletAssetTableName,
		)
			.join(
				AssetKnexDataGateway.assetTableName,
				AssetKnexDataGateway.assetTableName + ".id",
				WalletKnexDataGateway.walletAssetTableName + ".assetID",
			)
			.where(WalletKnexDataGateway.walletAssetTableName + ".walletID", id)
			.orderBy("operationDate")
			.select(
				this.database
					.ref("name")
					.as("assetName")
					.withSchema(AssetKnexDataGateway.assetTableName),
				this.database
					.ref("type")
					.withSchema(AssetKnexDataGateway.assetTableName),
				this.database
					.ref("lastPrice")
					.withSchema(AssetKnexDataGateway.assetTableName),
				this.database
					.ref("*")
					.withSchema(WalletKnexDataGateway.walletAssetTableName),
			);
		return {
			id,
			assets,
			// updatedAt: wallet.updatedAt,
		};
	}
	async getWalletList(): Promise<Omit<WalletDataMap, "assets">[]> {
		const wallets = await this.database<Omit<WalletDataMap, "assets">>(
			WalletKnexDataGateway.walletTableName,
		).select(this.database.ref("id"), this.database.ref("updatedAt"));
		return wallets;
	}
}
