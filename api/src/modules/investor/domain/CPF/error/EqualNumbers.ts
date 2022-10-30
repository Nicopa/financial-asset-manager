import { DomainClientError } from "../../../../../core/domain";

export class EqualNumbers extends DomainClientError {
	constructor(cpf: string) {
		super("CPF_WITH_EQUAL_NUMBERS", "Invalid CPF: equal numbers.", cpf);
	}
}
