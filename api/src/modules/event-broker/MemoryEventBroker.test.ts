import { Consumer } from "../../core/application/event";
import { DomainEvent } from "../../core/domain";
import { MemoryEventBroker } from "./MemoryEventBroker";

const delay = (time: number) => new Promise((res) => setTimeout(res, time));

describe("[event-broker] MemoryEventBroker", () => {
	let digit = 0;
	class DomainEventMock extends DomainEvent {}
	const consumer1: Consumer = {
		eventName: "DomainEventMock",
		handle: async function (domainEvent: DomainEvent): Promise<void> {
			await delay(300);
			digit = 1;
		},
	};
	const consumer2: Consumer = {
		eventName: "DomainEventMock",
		handle: async function (domainEvent: DomainEvent): Promise<void> {
			await delay(200);
			digit = 2;
		},
	};
	const consumer3: Consumer = {
		eventName: "DomainEventMock",
		handle: async function (domainEvent: DomainEvent): Promise<void> {
			await delay(100);
			digit = 3;
		},
	};
	test("It should handle domain events in the same order they are published.", async () => {
		const eventBroker = new MemoryEventBroker();
		eventBroker.subscribe(consumer1);
		eventBroker.subscribe(consumer2);
		eventBroker.subscribe(consumer3);
		expect(digit).toBe(0);
		eventBroker.publish(new DomainEventMock());
		eventBroker.publish(new DomainEventMock());
		await new Promise((r) => setTimeout(r, 700));
		expect(digit).toBe(3);
	});
});
