import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { UUIDProvider } from "../../../../core/domain/service/uuid";
import { Investor } from "../../domain";
import { Encryption } from "../../domain/encryption";
import { InvestorRepository } from "../../repository";
import { CPFAlreadyExists, UsernameAlreadyExists } from "./error";

export type CreateInvestorRequestModel = {
	username: string;
	fullname: string;
	password: string;
	cpf?: string;
};
export type CreateInvestorResponseModel = void;
export class CreateInvestor
	implements Command<CreateInvestorRequestModel, CreateInvestorResponseModel>
{
	constructor(
		private readonly investorRepository: InvestorRepository,
		private readonly uUIDProvider: UUIDProvider,
		private readonly encryption: Encryption,
		private readonly eventBroker: EventBroker,
	) {}
	private async validateUsernameAlreadyExists(username: string) {
		if (await this.investorRepository.findByUsername(username))
			throw new UsernameAlreadyExists(username);
	}
	private async validateCPFAlreadyExists(cpf: string) {
		if (await this.investorRepository.findByCPF(cpf))
			throw new CPFAlreadyExists(cpf);
	}
	async execute({
		username,
		fullname,
		password,
		cpf,
	}: CreateInvestorRequestModel): Promise<CreateInvestorResponseModel> {
		try {
			await this.validateUsernameAlreadyExists(username);
			if (cpf) await this.validateCPFAlreadyExists(cpf);
			const investor = Investor.create(
				{
					username,
					fullname,
					password,
					cpf,
				},
				this.uUIDProvider,
				this.encryption,
			);
			await this.investorRepository.add(investor);
			this.eventBroker.publish(investor.dispatchEvents());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
