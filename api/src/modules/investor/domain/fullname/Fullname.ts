import { ValueObject } from "../../../../core/domain";
import { InvalidLength } from "./error";

export type FullnameValue = string;
export class Fullname extends ValueObject<FullnameValue> {
	private constructor(value: FullnameValue) {
		super(value);
	}
	private static validateLength(value: FullnameValue) {
		if (value.length < 4) throw new InvalidLength(value);
	}
	public static create(value: FullnameValue): Fullname {
		const sanitizedValue = value.trim();
		this.validateLength(sanitizedValue);
		return new Fullname(sanitizedValue);
	}
	public static load(value: FullnameValue): Fullname {
		return new Fullname(value);
	}
}
