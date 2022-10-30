import { DomainEvent } from "../../domain";
import { Consumer } from "./Consumer";

export interface EventBroker {
	subscribe(consumer: Consumer): void;
	publish(domainEvent: DomainEvent | DomainEvent[]): void;
}
