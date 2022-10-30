import { DomainClientError } from "../../../../../core/domain";
import { QuantityValue } from "../Quantity";

export class NegativeQuantity extends DomainClientError {
	constructor(value: QuantityValue) {
		super("NEGATIVE_TRADING_QUANTITY", "Quantity cannot be negative.", value);
	}
}
