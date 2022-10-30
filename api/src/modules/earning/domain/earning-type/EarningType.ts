import { ValueObject } from "../../../../core/domain";
import { InvalidType } from "./error";

export const earningTypes: EarningTypeValue[] = [
	"DIVIDEND",
	"AMORTIZATION",
	"INCOME",
	"JCP",
];
export type EarningTypeValue = "DIVIDEND" | "AMORTIZATION" | "INCOME" | "JCP";
export class EarningType extends ValueObject<EarningTypeValue> {
	private constructor(value: EarningTypeValue) {
		super(value);
	}
	private static validateValue(value: EarningTypeValue) {
		if (!earningTypes.includes(value)) throw new InvalidType(value);
	}
	public static create(value: EarningTypeValue): EarningType {
		EarningType.validateValue(value);
		return new EarningType(value);
	}
	public static load(value: EarningTypeValue): EarningType {
		return new EarningType(value);
	}
}
