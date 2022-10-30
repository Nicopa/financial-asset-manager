import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { UUIDProvider } from "../../../../core/domain/service/uuid";
import { AccountIDType } from "../../../account/domain/id";
import { AccountRepository } from "../../../account/repository";
import { AccountNotFound } from "../../../account/repository/error";
import { Currency } from "../../../money/domain";
import { Deposit } from "../../domain";
import { DepositRepository } from "../../repository";

export type CreateDepositRequestModel = {
	accountID: AccountIDType;
	value: {
		amount: number;
		currency: Currency;
	};
	date: Date;
	note?: string;
};
export type CreateDepositResponseModel = void;
export class CreateDeposit
	implements Command<CreateDepositRequestModel, CreateDepositResponseModel>
{
	constructor(
		private readonly depositRepository: DepositRepository,
		private readonly accountRepository: AccountRepository,
		private readonly uUIDProvider: UUIDProvider,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		accountID,
		value,
		date,
		note,
	}: CreateDepositRequestModel): Promise<CreateDepositResponseModel> {
		try {
			const account = await this.accountRepository.findByID(accountID);
			if (!account) throw new AccountNotFound();
			const deposit = Deposit.create(
				{
					accountID: account.id.value,
					value,
					operationDate: date,
					settlementDate: date,
					note,
				},
				this.uUIDProvider,
			);
			await this.depositRepository.add(deposit);
			this.eventBroker.publish(deposit.state.cashFlow.dispatchEvents());
			this.eventBroker.publish(deposit.dispatchEvents());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
