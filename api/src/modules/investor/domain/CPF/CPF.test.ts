import { CPF } from "./CPF";
import { Empty, EqualNumbers, InvalidCheckDigit, WrongLength } from "./error";

describe("[investor] CPF", () => {
	const invalidCPFsData = {
		empty: " ",
		shortLength: "9011512006",
		longLength: "0790.115.120-06",
		invalidFirstCheckDigit: "790.115.120-16",
		invalidSecondCheckDigit: "790.115.120-07",
		equalNumbers: "111.111.111-11",
		random: "000.311.777-01",
	};
	const validCPFs = {
		full: "790.115.120-06",
		onlyNumbers: "79011512006",
	};
	test("It should throw error if empty CPF;", () => {
		expect(() => CPF.create(invalidCPFsData.empty)).toThrowError(Empty);
	});
	test("It should throw error if CPF is too short or too long;", () => {
		expect(() => CPF.create(invalidCPFsData.shortLength)).toThrowError(
			WrongLength,
		);
		expect(() => CPF.create(invalidCPFsData.longLength)).toThrowError(
			WrongLength,
		);
	});
	test("It should throw error if CPF numbers are all equal;", () => {
		expect(() => CPF.create(invalidCPFsData.equalNumbers)).toThrowError(
			EqualNumbers,
		);
	});
	test("It should throw error if invalid CPF;", () => {
		expect(() =>
			CPF.create(invalidCPFsData.invalidFirstCheckDigit),
		).toThrowError(InvalidCheckDigit);
		expect(() =>
			CPF.create(invalidCPFsData.invalidSecondCheckDigit),
		).toThrowError(InvalidCheckDigit);
		expect(() => CPF.create(invalidCPFsData.random)).toThrowError(
			InvalidCheckDigit,
		);
	});
	test("It should return CPF object if valid CPF;", () => {
		expect(CPF.create(validCPFs.onlyNumbers)).toBeInstanceOf(CPF);
		expect(CPF.create(validCPFs.full)).toBeInstanceOf(CPF);
	});
});
