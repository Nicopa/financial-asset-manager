import { DomainClientError } from "../../../../../core/domain";

export class InvalidType extends DomainClientError {
	constructor(value: string) {
		super("INVALID_CDB_TYPE", "The provided CDB type doesn't exist.", value);
	}
}
