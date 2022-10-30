export abstract class ValueObject<Value> {
	public readonly value: Value;
	constructor(value: Value) {
		this.value = value;
		Object.freeze(this);
	}
	equals(valueObject: ValueObject<Value>): boolean {
		return JSON.stringify(this.value) === JSON.stringify(valueObject.value);
	}
}
