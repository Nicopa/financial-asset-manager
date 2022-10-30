import { ValueObject } from "./ValueObject";

class ValueObjectMock extends ValueObject<{ prop: string }> {}
describe("[Core] Value Object", () => {
	test("It should identify if two value objects are equal.", () => {
		const vo1 = new ValueObjectMock({ prop: "This is a prop." });
		const vo2 = new ValueObjectMock({ prop: "This is a prop." });
		const vo3 = new ValueObjectMock({ prop: "This is another prop." });
		expect(vo1.equals(vo3)).toBe(false);
		expect(vo1.equals(vo2)).toBe(true);
	});
});
