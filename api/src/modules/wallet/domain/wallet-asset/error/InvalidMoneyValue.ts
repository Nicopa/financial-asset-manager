import { DomainClientError } from "../../../../../core/domain";

export class InvalidMoneyValue extends DomainClientError {
	constructor() {
		super(
			"INVALID_MONEY_VALUE",
			"A wallet asset should have an acquisition value or a disposal value.",
		);
	}
}
