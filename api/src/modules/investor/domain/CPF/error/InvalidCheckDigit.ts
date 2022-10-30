import { DomainClientError } from "../../../../../core/domain";

export class InvalidCheckDigit extends DomainClientError {
	constructor(cpf: string) {
		super("INVALID_CPF", "Invalid CPF.", cpf);
	}
}
