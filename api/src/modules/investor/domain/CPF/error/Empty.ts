import { DomainClientError } from "../../../../../core/domain";

export class Empty extends DomainClientError {
	constructor() {
		super("EMPTY_CPF", "Invalid CPF: empty string.");
	}
}
