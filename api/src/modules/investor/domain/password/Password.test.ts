import { encryptionMock } from "../encryption/__mocks__/EncryptionMock";
import { InvalidLength, MissingRequiredChars } from "./error";
import { Password } from "./Password";

describe("[investor] Password", () => {
	test("It should validate length (min: 8 and max: 32).", () => {
		expect(() => Password.create("", encryptionMock)).toThrowError(
			InvalidLength,
		);
		expect(() => Password.create("Test!12", encryptionMock)).toThrowError(
			InvalidLength,
		);
		expect(() =>
			Password.create("4cbc756c-bfe4-4376-9a8f-282338d46b0d", encryptionMock),
		).toThrowError(InvalidLength);
	});
	test("It should validate required characters.", () => {
		expect(() => Password.create("Test12345", encryptionMock)).toThrowError(
			MissingRequiredChars,
		);
		expect(() => Password.create("test!123", encryptionMock)).toThrowError(
			MissingRequiredChars,
		);
		expect(() => Password.create("TEST!234", encryptionMock)).toThrowError(
			MissingRequiredChars,
		);
		expect(() => Password.create("Test@Test", encryptionMock)).toThrowError(
			MissingRequiredChars,
		);
	});
	test("It should return password object if valid data.", () => {
		expect(Password.create("Test!123", encryptionMock)).toBeInstanceOf(
			Password,
		);
	});
	test("It should only return encrypted password.", () => {
		expect(Password.create("Test!123", encryptionMock).value).not.toBe(
			"Test!123",
		);
	});
});
