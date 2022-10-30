import { Investor } from "../domain";
import { CPFValue } from "../domain/CPF";
import { InvestorIDType } from "../domain/id";
import { UsernameValue } from "../domain/username";

export interface InvestorRepository {
	add(investor: Investor): Promise<void>;
	getByID(id: InvestorIDType): Promise<Investor>;
	findByID(id: InvestorIDType): Promise<Investor | undefined>;
	findByUsername(username: UsernameValue): Promise<Investor | undefined>;
	findByCPF(cpf: CPFValue): Promise<Investor | undefined>;
	update(investor: Investor): Promise<void>;
}
