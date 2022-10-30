import { ID } from "../../../../core/domain";

export type AssetIDType = string;
export class AssetID extends ID<AssetIDType> {
	static create(value: AssetIDType) {
		return new AssetID(value);
	}
	static load(value: AssetIDType) {
		return new AssetID(value);
	}
}
