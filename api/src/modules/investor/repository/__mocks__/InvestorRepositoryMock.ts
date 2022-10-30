import { Investor } from "../../domain";
import { CPFValue } from "../../domain/CPF";
import { InvestorIDType } from "../../domain/id";
import { UsernameValue } from "../../domain/username";
import { InvestorRepository } from "../InvestorRepository";

export const investorRepositoryMock: InvestorRepository = {
	add(investor: Investor): Promise<void> {
		return Promise.resolve();
	},
	getByID: function (id: string): Promise<Investor> {
		return Promise.resolve(
			Investor.load({
				id,
				username: "investor",
				fullname: "Investor Fullname",
				password: "########",
			}),
		);
	},
	findByID(id: InvestorIDType): Promise<Investor | undefined> {
		return Promise.resolve(
			Investor.load({
				id,
				username: "investor",
				fullname: "Investor Fullname",
				password: "########",
			}),
		);
	},
	findByUsername(username: UsernameValue): Promise<Investor | undefined> {
		return Promise.resolve(
			Investor.load({
				id: "investor",
				username,
				fullname: "Investor Fullname",
				password: "########",
			}),
		);
	},
	findByCPF(cpf: CPFValue): Promise<Investor | undefined> {
		return Promise.resolve(
			Investor.load({
				id: "investor",
				username: "investor",
				fullname: "Investor Fullname",
				password: "########",
				cpf,
			}),
		);
	},
	update(investor: Investor): Promise<void> {
		return Promise.resolve();
	},
};
