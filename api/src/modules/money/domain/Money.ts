import { ValueObject } from "../../../core/domain";

export type Currency = "BRL" | "USD";
export type MoneyValue = {
	readonly amount: number;
	readonly currency: Currency;
};
export class Money extends ValueObject<MoneyValue> {
	private constructor(value: MoneyValue) {
		super(value);
	}
	public toUSD(oneUSDinBRL: number): Money {
		if (this.value.currency === "USD") return this;
		return new Money({
			currency: "USD",
			amount: oneUSDinBRL * this.value.amount,
		});
	}
	public toBRL(oneUSDinBRL: number): Money {
		if (this.value.currency === "BRL") return this;
		return new Money({
			currency: "BRL",
			amount: oneUSDinBRL / this.value.amount,
		});
	}
	public static create(value: MoneyValue): Money {
		return new Money(value);
	}
	public static load(value: MoneyValue): Money {
		return new Money(value);
	}
}
