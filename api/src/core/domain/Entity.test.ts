import { Entity } from "./Entity";
import { ID } from "./ID";

class IDMock extends ID<string> {}
class EntityA extends Entity {}
class EntityB extends Entity {}
describe("[Core] Entity", () => {
	test("It should identify if two entities are the same.", () => {
		const entity1 = new EntityA(new IDMock("1"), {});
		const anotherRefToEntity1 = entity1;
		const entity2 = new EntityB(new IDMock("1"), {});
		const entity3 = new EntityA(new IDMock("2"), {});
		expect(entity1.is(entity2)).toBe(false);
		expect(entity1.is(entity3)).toBe(false);
		expect(entity1.is(entity1)).toBe(true);
		expect(entity1.is(anotherRefToEntity1)).toBe(true);
	});
});
