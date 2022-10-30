import { Consumer, EventBroker } from "../../core/application/event";
import { DomainEvent } from "../../core/domain";

export class MemoryEventBroker implements EventBroker {
	private consumers: Consumer[] = [];
	private queue: DomainEvent[] = [];
	private running: boolean = false;
	subscribe(consumer: Consumer) {
		this.consumers.push(consumer);
	}
	publish(domainEvent: DomainEvent | DomainEvent[]) {
		if (domainEvent instanceof Array) {
			this.queue.push(...domainEvent);
		} else {
			this.queue.push(domainEvent);
		}
		if (!this.running) {
			this.running = true;
			this.run();
		}
	}
	async run() {
		while (this.queue.length) {
			const domainEvent = this.queue.shift()!;
			for (const consumer of this.consumers) {
				if (consumer.eventName === domainEvent.constructor.name)
					await consumer.handle(domainEvent);
			}
		}
		this.running = false;
	}
}
