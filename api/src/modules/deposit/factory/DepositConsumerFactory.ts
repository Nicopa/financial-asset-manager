import { DepositCreatedConsumer } from "../consumer/deposit-created";
import { DepositDeletedConsumer } from "../consumer/deposit-deleted";
import { DepositDataGateway } from "../data-gateway";

export class DepositConsumerFactory {
	constructor(private readonly depositDataGateway: DepositDataGateway) {}
	public makeDepositCreatedConsumer() {
		return new DepositCreatedConsumer(this.depositDataGateway);
	}
	public makeDepositDeletedConsumer() {
		return new DepositDeletedConsumer(this.depositDataGateway);
	}
}
