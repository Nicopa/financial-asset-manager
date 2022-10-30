import { DomainClientError } from "../../../../../core/domain";

export class InvalidLength extends DomainClientError {
	constructor(value: string) {
		super(
			"INVALID_ASSET_FULLNAME_LENGTH",
			"Fullname length cannot be less than 2 characters.",
			value,
		);
	}
}
