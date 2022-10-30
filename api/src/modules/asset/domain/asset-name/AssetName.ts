import { ValueObject } from "../../../../core/domain";
import { InvalidLength } from "./error";

export type AssetNameValue = string;
export class AssetName extends ValueObject<AssetNameValue> {
	private constructor(value: AssetNameValue) {
		super(value);
	}
	private static validateLength(value: AssetNameValue) {
		if (value.length < 2) throw new InvalidLength(value);
	}
	public static create(value: AssetNameValue): AssetName {
		const sanitizedValue = value.trim();
		this.validateLength(sanitizedValue);
		return new AssetName(sanitizedValue);
	}
	public static load(value: AssetNameValue): AssetName {
		return new AssetName(value);
	}
}
