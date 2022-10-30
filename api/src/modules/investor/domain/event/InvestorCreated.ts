import { DomainEvent } from "../../../../core/domain";
import { CPFValue } from "../CPF";
import { FullnameValue } from "../fullname";
import { InvestorIDType } from "../id";
import { PasswordValue } from "../password";
import { UsernameValue } from "../username";

export type InvestorCreatedData = {
	investor: {
		id: InvestorIDType;
		username: UsernameValue;
		fullname: FullnameValue;
		password: PasswordValue;
		cpf?: CPFValue;
	};
};
export class InvestorCreated extends DomainEvent {
	constructor(public readonly data: InvestorCreatedData) {
		super();
	}
}
