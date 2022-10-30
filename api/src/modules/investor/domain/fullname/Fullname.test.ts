import { InvalidLength } from "./error";
import { Fullname } from "./Fullname";

describe("[investor] Fullname", () => {
	test("It should return an error if fullname length is less than 4", () => {
		expect(() => Fullname.create("Ton")).toThrowError(InvalidLength);
	});
	test("It should trim blank spaces at the beginning and ending", () => {
		expect(() => Fullname.create("     ")).toThrowError(InvalidLength);
		expect(Fullname.create("  Tony   ").value).toBe("Tony");
	});
	test("It should return the value object if valid.", () => {
		expect(Fullname.create("Tony")).toBeInstanceOf(Fullname);
		expect(Fullname.create(" Tony")).toBeInstanceOf(Fullname);
	});
});
