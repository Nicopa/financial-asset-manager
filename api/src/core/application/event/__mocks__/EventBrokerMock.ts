import { DomainEvent } from "../../../domain";
import { Consumer } from "../Consumer";
import { EventBroker } from "../EventBroker";

export const eventBrokerMock: EventBroker = {
	subscribe(consumer: Consumer): Promise<void> {
		return Promise.resolve();
	},
	publish(domainEvent: DomainEvent): Promise<void> {
		return Promise.resolve();
	},
};
