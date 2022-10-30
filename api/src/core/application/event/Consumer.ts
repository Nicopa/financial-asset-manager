import { DomainEvent } from "../../domain";

export interface Consumer {
	eventName: string;
	handle(domainEvent: DomainEvent): Promise<void>;
}
