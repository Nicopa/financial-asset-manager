import { ApplicationClientError } from "../../../../../core/application/error";

export class CPFAlreadyExists extends ApplicationClientError {
	constructor(value: string) {
		super("INVESTOR_CPF_ALREADY_EXISTS", "This CPF already exists.", value);
	}
}
