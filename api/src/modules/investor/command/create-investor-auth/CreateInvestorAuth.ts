import { Command, UseCase } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AuthProvider } from "../../../auth";
import { Encryption } from "../../domain/encryption";
import { InvestorRepository } from "../../repository";
import { IncorrectPassword, UsernameNotFound } from "./error";

export type CreateInvestorAuthRequestModel = {
	username: string;
	password: string;
};
export type CreateInvestorAuthResponseModel = {
	token: string;
	username: string;
	fullname: string;
	cpf?: string;
};
export class CreateInvestorAuth
	implements
		Command<CreateInvestorAuthRequestModel, CreateInvestorAuthResponseModel>
{
	constructor(
		private readonly investorRepository: InvestorRepository,
		private readonly encryption: Encryption,
		private readonly authProvider: AuthProvider,
	) {}
	async execute({
		username,
		password,
	}: CreateInvestorAuthRequestModel): Promise<CreateInvestorAuthResponseModel> {
		try {
			const investor = await this.investorRepository.findByUsername(username);
			if (!investor) throw new UsernameNotFound(username);
			const encryptedPassword = this.encryption.encryptPassword(password);
			if (
				!this.authProvider.isEqualPassword(
					investor.state.password.value,
					encryptedPassword,
				)
			)
				throw new IncorrectPassword();
			return {
				token: this.authProvider.getToken(investor.id.value),
				username: investor.state.username.value,
				fullname: investor.state.fullname.value,
				cpf: investor.state.cpf?.value,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
