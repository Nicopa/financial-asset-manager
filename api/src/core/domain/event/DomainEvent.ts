export abstract class DomainEvent {
	public readonly dateTimeCreatedAt: Date;
	constructor() {
		this.dateTimeCreatedAt = new Date();
	}
}
