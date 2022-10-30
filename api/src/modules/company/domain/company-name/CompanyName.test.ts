import { CompanyName } from "./CompanyName";
import { InvalidLength } from "./error";

describe("CompanyName", () => {
	test("It should return an error if fullname length is less than 2", () => {
		expect(() => CompanyName.create("C")).toThrowError(InvalidLength);
	});
	test("It should trim blank spaces at the beginning and ending", () => {
		expect(() => CompanyName.create("     ")).toThrowError(InvalidLength);
		expect(CompanyName.create("  Company   ").value).toBe("Company");
	});
	test("It should return the value object if valid.", () => {
		expect(CompanyName.create("Company")).toBeInstanceOf(CompanyName);
		expect(CompanyName.create(" Company")).toBeInstanceOf(CompanyName);
	});
});
