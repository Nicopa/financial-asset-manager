export abstract class ID<Type = string | number> {
	constructor(public readonly value: Type) {}
	equals(id: ID<Type>): boolean {
		if (!(id instanceof this.constructor)) return false;
		return id.value === this.value;
	}
}
