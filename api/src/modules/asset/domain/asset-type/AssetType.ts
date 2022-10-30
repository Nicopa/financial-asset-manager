import { ValueObject } from "../../../../core/domain";
import { InvalidType } from "./error";

export const assetTypes: AssetTypeValue[] = [
	"BRAZILIAN_STOCK",
	"BRAZILIAN_REAL_ESTATE",
	"BRAZILIAN_DEPOSITARY_RECEIPT",
	"BRAZILIAN_ETF",
	"CDB",
];
export type AssetTypeValue =
	| "BRAZILIAN_STOCK"
	| "BRAZILIAN_REAL_ESTATE"
	| "BRAZILIAN_DEPOSITARY_RECEIPT"
	| "BRAZILIAN_ETF"
	| "CDB";
export class AssetType extends ValueObject<AssetTypeValue> {
	private constructor(value: AssetTypeValue) {
		super(value);
	}
	private static validateValue(value: AssetTypeValue) {
		if (!assetTypes.includes(value)) throw new InvalidType(value);
	}
	public static create(value: AssetTypeValue): AssetType {
		AssetType.validateValue(value);
		return new AssetType(value);
	}
	public static load(value: AssetTypeValue): AssetType {
		return new AssetType(value);
	}
}
