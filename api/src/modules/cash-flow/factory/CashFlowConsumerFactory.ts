import { CompanyDataGateway } from "../../company/data-gateway";
import { CashFlowCreatedConsumer } from "../consumer/cash-flow-created";
import { CashFlowDeletedConsumer } from "../consumer/cash-flow-deleted";
import { CashFlowDataGateway } from "../data-gateway";

export class CashFlowConsumerFactory {
	constructor(
		private readonly cashFlowDataGateway: CashFlowDataGateway,
		private readonly companyDataGateway: CompanyDataGateway,
	) {}
	public makeCashFlowCreatedConsumer() {
		return new CashFlowCreatedConsumer(
			this.cashFlowDataGateway,
			this.companyDataGateway,
		);
	}
	public makeCashFlowDeletedConsumer() {
		return new CashFlowDeletedConsumer(this.cashFlowDataGateway);
	}
}
