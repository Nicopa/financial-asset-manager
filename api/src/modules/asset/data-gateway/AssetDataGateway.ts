import { AssetNameValue } from "../domain/asset-name/AssetName";
import { AssetTypeValue } from "../domain/asset-type/AssetType";
import { AssetIDType } from "../domain/id";

export type AssetDataMap = {
	id: AssetIDType;
	name: AssetNameValue;
	type: AssetTypeValue;
	lastPrice: number;
	updatedAt: Date;
};
export interface AssetDataGateway {
	findByID(id: AssetIDType): Promise<AssetDataMap | undefined>;
	findAllByName(name: AssetNameValue): Promise<AssetDataMap[]>;
	getByID(id: AssetIDType): Promise<AssetDataMap>;
	getAll(): Promise<AssetDataMap[]>;
	updateLastPrice(id: AssetIDType, price: number): Promise<void>;
}
