import { AggregateRoot } from "../../../core/domain";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { CPF, CPFValue } from "./CPF";
import { Encryption } from "./encryption";
import { InvestorCreated } from "./event";
import { Fullname, FullnameValue } from "./fullname";
import { InvestorID, InvestorIDType } from "./id";
import { Password, PasswordValue } from "./password";
import { Username, UsernameValue } from "./username";

export interface InvestorState {
	readonly username: Username;
	readonly fullname: Fullname;
	readonly password: Password;
	readonly cpf?: CPF;
}
export type InvestorLoadParams = {
	id: InvestorIDType;
	username: UsernameValue;
	fullname: FullnameValue;
	password: PasswordValue;
	cpf?: CPFValue;
};
export type InvestorCreateParams = Omit<InvestorLoadParams, "id">;
export class Investor extends AggregateRoot<InvestorIDType, InvestorState> {
	constructor(id: InvestorID, state: InvestorState) {
		super(id, state);
	}
	public static create(
		params: InvestorCreateParams,
		uUIDProvider: UUIDProvider,
		encryption: Encryption,
	): Investor {
		const investor = new Investor(InvestorID.create(uUIDProvider), {
			username: Username.create(params.username),
			fullname: Fullname.create(params.fullname),
			password: Password.create(params.password, encryption),
			cpf: params.cpf ? CPF.create(params.cpf) : undefined,
		});
		investor.addDomainEvent(
			new InvestorCreated({
				investor: {
					id: investor.id.value,
					username: investor.state.username.value,
					fullname: investor.state.fullname.value,
					password: investor.state.password.value,
					cpf: investor.state.cpf?.value,
				},
			}),
		);
		return investor;
	}
	public static load(params: InvestorLoadParams) {
		return new Investor(InvestorID.load(params.id), {
			username: Username.load(params.username),
			fullname: Fullname.load(params.fullname),
			password: Password.load(params.password),
			cpf: params.cpf ? CPF.load(params.cpf) : undefined,
		});
	}
}
