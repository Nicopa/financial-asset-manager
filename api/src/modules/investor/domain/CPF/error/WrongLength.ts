import { DomainClientError } from "../../../../../core/domain";

export class WrongLength extends DomainClientError {
	constructor(cpf: string) {
		super("WRONG_INVESTOR_CPF_LENGTH", "Invalid CPF: wrong length.", cpf);
	}
}
