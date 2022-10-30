import { DomainClientError } from "../../../../../core/domain";

export class AccountAlreadyExists extends DomainClientError {
	constructor() {
		super(
			"ACCOUNT_ALREADY_EXISTS",
			"The provided broker account already exists.",
		);
	}
}
