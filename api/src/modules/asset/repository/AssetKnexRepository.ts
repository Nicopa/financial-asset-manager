import { KnexDatabase } from "../../database/knex";
import { Asset } from "../domain";
import { AssetNameValue } from "../domain/asset-name/AssetName";
import { AssetTypeValue } from "../domain/asset-type/AssetType";
import { AssetIDType } from "../domain/id";
import { AssetRepository } from "./AssetRepository";

export type AssetDataMap = {
	id: AssetIDType;
	name: AssetNameValue;
	type: AssetTypeValue;
	lastPrice: number;
};
export class AssetKnexRepository
	extends KnexDatabase
	implements AssetRepository
{
	public static readonly assetTableName = "assets";
	private toDomain({ id, name, type, lastPrice }: AssetDataMap): Asset {
		return Asset.load({
			id,
			name,
			type,
			lastPrice: {
				amount: lastPrice,
				currency: "BRL",
			},
		});
	}
	private async findBy(property: string, value: string | number) {
		const assetData = await this.database
			.select("*")
			.from<AssetDataMap>(AssetKnexRepository.assetTableName)
			.where(property, value)
			.first();
		if (assetData === undefined) return undefined;
		return this.toDomain(assetData);
	}
	async findByID(id: string): Promise<Asset | undefined> {
		return await this.findBy("id", id);
	}
}
