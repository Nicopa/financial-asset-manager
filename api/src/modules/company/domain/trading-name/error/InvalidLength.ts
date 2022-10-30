import { DomainClientError } from "../../../../../core/domain";

export class InvalidLength extends DomainClientError {
	constructor(value: string) {
		super(
			"INVALID_TRADING_NAME_LENGTH",
			"Trading name length cannot be less than 2 characters.",
			value,
		);
	}
}
