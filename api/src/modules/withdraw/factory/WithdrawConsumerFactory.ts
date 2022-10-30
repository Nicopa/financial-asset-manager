import { WithdrawCreatedConsumer } from "../consumer/withdraw-created";
import { WithdrawDeletedConsumer } from "../consumer/withdraw-deleted";
import { WithdrawDataGateway } from "../data-gateway";

export class WithdrawConsumerFactory {
	constructor(private readonly withdrawDataGateway: WithdrawDataGateway) {}
	public makeWithdrawCreatedConsumer() {
		return new WithdrawCreatedConsumer(this.withdrawDataGateway);
	}
	public makeWithdrawDeletedConsumer() {
		return new WithdrawDeletedConsumer(this.withdrawDataGateway);
	}
}
