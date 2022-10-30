import { KnexDatabase } from "../../database/knex";
import { AssetNameValue } from "../domain/asset-name/AssetName";
import { AssetIDType } from "../domain/id";
import { AssetDataGateway, AssetDataMap } from "./AssetDataGateway";
import { IDNotFound } from "./error";

export class AssetKnexDataGateway
	extends KnexDatabase
	implements AssetDataGateway
{
	public static readonly assetTableName = "assets";
	async findByID(id: AssetIDType): Promise<AssetDataMap | undefined> {
		const assetData = await this.database
			.select("*")
			.from<AssetDataMap>(AssetKnexDataGateway.assetTableName)
			.where("id", id)
			.first();
		return assetData;
	}
	async findAllByName(name: AssetNameValue): Promise<AssetDataMap[]> {
		const assetsData = await this.database
			.from<AssetDataMap>(AssetKnexDataGateway.assetTableName)
			.whereILike("name", `%${name}%`)
			.select("*");
		return assetsData;
	}
	async getByID(id: string): Promise<AssetDataMap> {
		const assetData = await this.findByID(id);
		if (!assetData) throw new IDNotFound(id);
		return assetData;
	}
	async getAll(): Promise<AssetDataMap[]> {
		const assetsData = await this.database
			.from<AssetDataMap>(AssetKnexDataGateway.assetTableName)
			.select("*");
		return assetsData;
	}
	async updateLastPrice(id: AssetIDType, price: number): Promise<void> {
		await this.database(AssetKnexDataGateway.assetTableName)
			.where("id", id)
			.update({
				lastPrice: price,
				updatedAt: new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					new Date().getDate(),
				),
			});
	}
}
