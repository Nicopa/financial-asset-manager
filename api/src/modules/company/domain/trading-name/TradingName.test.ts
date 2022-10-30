import { InvalidLength } from "./error";
import { TradingName } from "./TradingName";

describe("TradingName", () => {
	test("It should return an error if fullname length is less than 2", () => {
		expect(() => TradingName.create("C")).toThrowError(InvalidLength);
	});
	test("It should trim blank spaces at the beginning and ending", () => {
		expect(() => TradingName.create("     ")).toThrowError(InvalidLength);
		expect(TradingName.create("  Company   ").value).toBe("Company");
	});
	test("It should return the value object if valid.", () => {
		expect(TradingName.create("Company")).toBeInstanceOf(TradingName);
		expect(TradingName.create(" Company")).toBeInstanceOf(TradingName);
	});
});
