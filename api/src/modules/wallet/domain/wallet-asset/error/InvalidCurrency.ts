import { DomainClientError } from "../../../../../core/domain";

export class InvalidCurrency extends DomainClientError {
	constructor() {
		super(
			"INVALID_CURRENCY",
			"Currency should be equal to the wallet asset currency.",
		);
	}
}
