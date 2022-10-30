import { ValueObject } from "../../../../core/domain";
import { Encryption } from "../encryption/Encryption";
import { InvalidLength, MissingRequiredChars } from "./error";

export type PasswordValue = string;
export class Password extends ValueObject<PasswordValue> {
	private constructor(value: PasswordValue) {
		super(value);
	}
	private static validateLength(value: PasswordValue) {
		if (value.length < 8 || value.length > 32) throw new InvalidLength();
	}
	private static validateRequiredChars(password: PasswordValue) {
		if (
			!(
				/[!@#$%&*.\-_+]/.test(password) &&
				/[A-Z]/.test(password) &&
				/[a-z]/.test(password) &&
				/[0-9]/.test(password)
			)
		)
			throw new MissingRequiredChars();
	}
	public static create(value: PasswordValue, encryption: Encryption): Password {
		this.validateLength(value);
		this.validateRequiredChars(value);
		const hashPassword = encryption.encryptPassword(value);
		return new Password(hashPassword);
	}
	public static load(value: PasswordValue): Password {
		return new Password(value);
	}
}
