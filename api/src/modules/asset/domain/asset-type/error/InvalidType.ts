import { DomainClientError } from "../../../../../core/domain";

export class InvalidType extends DomainClientError {
	constructor(value: string) {
		super(
			"INVALID_ASSET_TYPE",
			"The provided asset type doesn't exist.",
			value,
		);
	}
}
