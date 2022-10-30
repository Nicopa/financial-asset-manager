import { ValueObject } from "../../../../core/domain/ValueObject";
import { InvalidLength } from "./error";

export type CompanyNameValue = string;
export class CompanyName extends ValueObject<CompanyNameValue> {
	private constructor(value: CompanyNameValue) {
		super(value);
	}
	private static validateLength(value: CompanyNameValue) {
		if (value.length < 2) throw new InvalidLength(value);
	}
	public static create(value: CompanyNameValue): CompanyName {
		const sanitizedValue = value.trim();
		this.validateLength(sanitizedValue);
		return new CompanyName(sanitizedValue);
	}
	public static load(value: CompanyNameValue): CompanyName {
		return new CompanyName(value);
	}
}
