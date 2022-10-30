import { DomainClientError } from "../../../../core/domain";

export class NegativeAmount extends DomainClientError {
	constructor(amount: number) {
		super("INVALID_VALUE_AMOUNT", "Amount cannot be negative.", amount);
	}
}
