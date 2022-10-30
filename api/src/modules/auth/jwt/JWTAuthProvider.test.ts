import { BadFormatted, ExpiredToken, NoTokenProvided } from "./error";
import { JWTAuthProvider } from "./JWTAuthProvider";

describe("JWT Auth Provider", () => {
	test("It should return if two passwords are the same.", () => {
		const jwtAuthProvider = new JWTAuthProvider();
		expect(jwtAuthProvider.isEqualPassword("123ABC", "123ABC")).toBe(true);
		expect(jwtAuthProvider.isEqualPassword("123ABC", "123ABC ")).toBe(false);
	});
	test("It should throw error if empty token is provided.", () => {
		const jwtAuthProvider = new JWTAuthProvider();
		expect(() => jwtAuthProvider.getPayload("")).toThrowError(NoTokenProvided);
	});
	test("It should throw error if token has not the correct password.", () => {
		const jwtAuthProvider = new JWTAuthProvider();
		expect(() => jwtAuthProvider.getPayload("Bearer TOKEN TOKEN")).toThrowError(
			BadFormatted,
		);
	});
	test("It should throw error if token has not the correct password.", () => {
		const jwtAuthProvider = new JWTAuthProvider();
		expect(() => jwtAuthProvider.getPayload("Beare CODE")).toThrowError(
			BadFormatted,
		);
	});
	test("It should return a token for a given payload.", () => {
		const jwtAuthProvider = new JWTAuthProvider();
		expect(() => jwtAuthProvider.getToken("example")).not.toThrowError();
		expect(jwtAuthProvider.getToken("example").length).toBeGreaterThan(0);
	});
	test("It should return a payload for a given token.", () => {
		const jwtAuthProvider = new JWTAuthProvider();
		const token = jwtAuthProvider.getToken("investor1");
		expect(jwtAuthProvider.getPayload(`Bearer ${token}`)).toBe("investor1");
	});
	test("It should throw error if token is expired (7 days).", () => {
		jest.useFakeTimers();
		const jwtAuthProvider = new JWTAuthProvider();
		const token = jwtAuthProvider.getToken("investor1");
		setTimeout(() => {}, 1000 * 60 * 60 * 24 * 7);
		jest.runAllTimers();
		expect(() => jwtAuthProvider.getPayload(`Bearer ${token}`)).toThrowError(
			ExpiredToken,
		);
		jest.useRealTimers();
	});
});
