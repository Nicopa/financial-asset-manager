import { UUIDProvider } from "./UUIDProvider";

describe("UUID Provider", () => {
	test("It should generate an ID with 32 characters at least.", () => {
		const uUIDProvider = new UUIDProvider();
		expect(uUIDProvider.generate()).toHaveLength(32);
	});
	test("It should a different ID each time.", () => {
		const uUIDProvider = new UUIDProvider();
		const id = uUIDProvider.generate();
		let isEqual = false;
		for (let index = 0; index < 10; index++)
			if (uUIDProvider.generate() === id) isEqual = true;
		expect(isEqual).toBe(false);
	});
});
