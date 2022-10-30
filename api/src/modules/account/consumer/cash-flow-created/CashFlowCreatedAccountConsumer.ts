import { Consumer } from "../../../../core/application/event";
import { CashFlowCreated } from "../../../cash-flow/domain/event";
import { AccountRepository } from "../../repository";

export class CashFlowCreatedAccountConsumer implements Consumer {
	eventName = "CashFlowCreated";
	constructor(private readonly accountRepository: AccountRepository) {}
	async handle(domainEvent: CashFlowCreated): Promise<void> {
		const account = await this.accountRepository.getByID(
			domainEvent.data.accountID,
		);
		account.updateBalance(
			domainEvent.data.operation,
			domainEvent.data.value.currency,
			domainEvent.data.value.amount,
		);
		await this.accountRepository.update(account);
	}
}
