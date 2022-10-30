import { ValueObject } from "../../../../core/domain/ValueObject";
import { Empty, EqualNumbers, InvalidCheckDigit, WrongLength } from "./error";

export type CPFValue = string;
export class CPF extends ValueObject<CPFValue> {
	private static CPF_NUMBERS_LENGTH = 11;
	private static FIRST_CHECK_DIGIT_INDEX = 9;
	private static SECOND_CHECK_DIGIT_INDEX = 10;

	private constructor(value: CPFValue) {
		super(value);
	}
	private static sanitize(value: CPFValue): CPFValue {
		return value.replace(/\D/gm, "");
	}
	private static getCheckDigit(
		digits: number[],
		checkDigitIndex: number,
	): number {
		let sum = 0;
		for (let index = 0; index < checkDigitIndex; index++)
			sum += digits[index] * (checkDigitIndex + 1 - index);
		const rest = sum % 11;
		return rest < 2 ? 0 : 11 - rest;
	}
	private static validateNotEmpty(value: CPFValue) {
		if (!value.trim()) throw new Empty();
	}
	private static validateLength(value: CPFValue) {
		if (value.length !== this.CPF_NUMBERS_LENGTH) throw new WrongLength(value);
	}
	private static validateNotEqualNumbers(digits: number[], value: CPFValue) {
		if (digits.every((digit) => digit === digits[0]))
			throw new EqualNumbers(value);
	}
	private static validateCheckDigits(digits: number[], value: CPFValue) {
		const firstCheckDigit = this.getCheckDigit(
			digits,
			this.FIRST_CHECK_DIGIT_INDEX,
		);
		const secondCheckDigit = this.getCheckDigit(
			digits,
			this.SECOND_CHECK_DIGIT_INDEX,
		);
		if (
			firstCheckDigit !== digits[this.FIRST_CHECK_DIGIT_INDEX] ||
			secondCheckDigit !== digits[this.SECOND_CHECK_DIGIT_INDEX]
		)
			throw new InvalidCheckDigit(value);
	}
	public static create(value: CPFValue) {
		const sanitizedValue = this.sanitize(value);
		this.validateNotEmpty(sanitizedValue);
		this.validateLength(sanitizedValue);
		const digits = sanitizedValue
			.split("")
			.map((character) => parseInt(character));
		this.validateNotEqualNumbers(digits, value);
		this.validateCheckDigits(digits, value);
		return new CPF(value);
	}
	public static load(value: CPFValue): CPF {
		return new CPF(value);
	}
}
