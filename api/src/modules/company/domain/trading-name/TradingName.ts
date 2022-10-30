import { ValueObject } from "../../../../core/domain/ValueObject";
import * as Error from "./error";

export type TradingNameValue = string;
export class TradingName extends ValueObject<TradingNameValue> {
	private constructor(value: TradingNameValue) {
		super(value);
	}
	private static validateLength(value: TradingNameValue) {
		if (value.length < 2) throw new Error.InvalidLength(value);
	}
	public static create(value: TradingNameValue): TradingName {
		const sanitizedValue = value.trim();
		this.validateLength(sanitizedValue);
		return new TradingName(sanitizedValue);
	}
	public static load(value: TradingNameValue): TradingName {
		return new TradingName(value);
	}
}
