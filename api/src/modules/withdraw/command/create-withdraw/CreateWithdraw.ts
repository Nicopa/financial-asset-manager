import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { UUIDProvider } from "../../../../core/domain/service/uuid";
import { AccountIDType } from "../../../account/domain/id";
import { AccountRepository } from "../../../account/repository";
import { AccountNotFound } from "../../../account/repository/error";
import { CashFlow } from "../../../cash-flow/domain";
import { Currency } from "../../../money/domain";
import { Withdraw } from "../../domain";
import { WithdrawRepository } from "../../repository";

export type CreateWithdrawRequestModel = {
	accountID: AccountIDType;
	value: {
		amount: number;
		currency: Currency;
	};
	date: Date;
	note?: string;
};
export type CreateWithdrawResponseModel = void;
export class CreateWithdraw
	implements Command<CreateWithdrawRequestModel, CreateWithdrawResponseModel>
{
	constructor(
		private readonly withdrawRepository: WithdrawRepository,
		private readonly accountRepository: AccountRepository,
		private readonly uUIDProvider: UUIDProvider,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		accountID,
		value,
		date,
		note,
	}: CreateWithdrawRequestModel): Promise<CreateWithdrawResponseModel> {
		try {
			const account = await this.accountRepository.findByID(accountID);
			if (!account) throw new AccountNotFound();
			const withdraw = Withdraw.create(
				{
					accountID: account.id.value,
					value,
					operationDate: date,
					settlementDate: date,
					note,
				},
				this.uUIDProvider,
			);
			await this.withdrawRepository.add(withdraw);
			this.eventBroker.publish(withdraw.state.cashFlow.dispatchEvents());
			this.eventBroker.publish(withdraw.dispatchEvents());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
