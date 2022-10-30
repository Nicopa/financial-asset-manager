import { AggregateRoot } from "./AggregateRoot";
import { DomainEvent } from "./event/DomainEvent";
import { ID } from "./ID";

class DomainEventMock extends DomainEvent {}
class IDMock extends ID<string> {}
class AggregateMock extends AggregateRoot<string, any> {}
describe("[Core] Aggregate Root", () => {
	test("It should be able to store and dispatch domain events.", () => {
		const aggregate = new AggregateMock(new IDMock("id"), null);
		expect(aggregate.dispatchEvents()).toHaveLength(0);
		aggregate.addDomainEvent(new DomainEventMock());
		aggregate.addDomainEvent(new DomainEventMock());
		expect(aggregate.dispatchEvents()).toHaveLength(2);
		expect(aggregate.dispatchEvents()).toHaveLength(0);
	});
});
