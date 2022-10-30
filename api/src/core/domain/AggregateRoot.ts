import { Entity } from "./Entity";
import { DomainEvent } from "./event/DomainEvent";

export abstract class AggregateRoot<IDType, State = {}> extends Entity<
	IDType,
	State
> {
	protected domainEvents: DomainEvent[] = [];
	protected clearEvents() {
		this.domainEvents = [];
	}
	public dispatchEvents(): DomainEvent[] {
		const events = this.domainEvents;
		this.clearEvents();
		return events;
	}
	public addDomainEvent(domainEvent: DomainEvent) {
		this.domainEvents.push(domainEvent);
	}
}
