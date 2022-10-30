import { ValueObject } from "../../../../core/domain";
import { InvalidChar, InvalidLength } from "./error";

export type UsernameValue = string;
export class Username extends ValueObject<UsernameValue> {
	private constructor(value: UsernameValue) {
		super(value);
	}
	private static validateChars(value: UsernameValue) {
		if (value.match(/[^\w!@#$%&*\-_.+=]/gm)) throw new InvalidChar(value);
	}
	private static validateLength(value: UsernameValue) {
		if (value.length < 4) throw new InvalidLength(value);
	}
	public static create(value: UsernameValue): Username {
		this.validateChars(value);
		this.validateLength(value);
		return new Username(value);
	}
	public static load(value: UsernameValue): Username {
		return new Username(value);
	}
}
