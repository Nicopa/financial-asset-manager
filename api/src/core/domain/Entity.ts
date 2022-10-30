import { ID } from "./ID";

export abstract class Entity<IDType = string, State = {}> {
	constructor(public readonly id: ID<IDType>, public readonly state: State) {}
	public is(entity: Entity<IDType, State>) {
		return this.constructor === entity.constructor && this.id.equals(entity.id);
	}
}
