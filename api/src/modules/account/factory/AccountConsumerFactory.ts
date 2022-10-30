import { CashFlowCreatedAccountConsumer } from "../consumer/cash-flow-created";
import { CashFlowDeletedAccountConsumer } from "../consumer/cash-flow-deleted";
import { AccountRepository } from "../repository";

export class AccountConsumerFactory {
	constructor(private readonly accountRepository: AccountRepository) {}
	public makeCashFlowCreatedAccountConsumer() {
		return new CashFlowCreatedAccountConsumer(this.accountRepository);
	}
	public makeCashFlowDeletedAccountConsumer() {
		return new CashFlowDeletedAccountConsumer(this.accountRepository);
	}
}
