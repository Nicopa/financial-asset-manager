import { InvalidChar, InvalidLength } from "./error";
import { Username } from "./Username";

describe("[investor] Username", () => {
	test("It should throw error if username length is less than 4", () => {
		expect(() => Username.create("Use")).toThrowError(InvalidLength);
	});
	test("It should throw error if it has invalid chars (not a-zA-Z0-9!@#$%&*-_.+=).", () => {
		expect(() => Username.create(" Username")).toThrowError(InvalidChar);
		expect(() => Username.create("Usr¨name")).toThrowError(InvalidChar);
		expect(() => Username.create("User{name")).toThrowError(InvalidChar);
		expect(() => Username.create("Username^")).toThrowError(InvalidChar);
		expect(() => Username.create("Username~")).toThrowError(InvalidChar);
		expect(() => Username.create("Username\
		")).toThrowError(InvalidChar);
	});
	test("It should return an investor object if created with valid.", () => {
		const username = Username.create("Username1");
		expect(username).toBeInstanceOf(Username);
		expect(username.value).toBe("Username1");
		expect(Username.create("13%User")).toBeInstanceOf(Username);
		expect(Username.create("User.name@")).toBeInstanceOf(Username);
	});
});
