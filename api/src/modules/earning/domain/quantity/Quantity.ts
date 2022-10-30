import { ValueObject } from "../../../../core/domain";
import { NegativeQuantity } from "./error";

export type QuantityValue = number;
export class Quantity extends ValueObject<QuantityValue> {
	private static validateQuantity(quantity: QuantityValue) {
		if (quantity < 0) throw new NegativeQuantity(quantity);
	}
	public static create(value: QuantityValue): Quantity {
		Quantity.validateQuantity(value);
		return new Quantity(value);
	}
	public static load(value: QuantityValue): Quantity {
		return new Quantity(value);
	}
}
