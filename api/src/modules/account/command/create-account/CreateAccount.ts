import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { BrokerIDType } from "../../../broker/domain/id/BrokerID";
import { InvestorIDType } from "../../../investor/domain/id";
import { Account } from "../../domain";
import { AccountCreated } from "../../domain/event";
import { AccountRepository } from "../../repository";
import { AccountAlreadyExists } from "./error";

export type CreateAccountRequestModel = {
	investorID: InvestorIDType;
	brokerID: BrokerIDType;
};
export type CreateAccountResponseModel = void;
export class CreateAccount
	implements Command<CreateAccountRequestModel, CreateAccountResponseModel>
{
	constructor(
		private readonly accountRepository: AccountRepository,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		investorID,
		brokerID,
	}: CreateAccountRequestModel): Promise<CreateAccountResponseModel> {
		try {
			if (await this.accountRepository.findByID({ investorID, brokerID }))
				throw new AccountAlreadyExists();
			const account = Account.create({
				id: {
					investorID,
					brokerID,
				},
			});
			await this.accountRepository.add(account);
			this.eventBroker.publish(account.dispatchEvents());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
