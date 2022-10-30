import { Consumer } from "../../../../core/application/event";
import { CashFlowDeleted } from "../../../cash-flow/domain/event";
import { AccountRepository } from "../../repository";

export class CashFlowDeletedAccountConsumer implements Consumer {
	eventName = "CashFlowDeleted";
	constructor(private readonly accountRepository: AccountRepository) {}
	async handle(domainEvent: CashFlowDeleted): Promise<void> {
		const account = await this.accountRepository.getByID(
			domainEvent.data.accountID,
		);
		account.updateBalance(
			domainEvent.data.operation === "IN" ? "OUT" : "IN",
			domainEvent.data.value.currency,
			domainEvent.data.value.amount,
		);
		await this.accountRepository.update(account);
	}
}
