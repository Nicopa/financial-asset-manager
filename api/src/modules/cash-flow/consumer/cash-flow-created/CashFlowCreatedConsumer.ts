import { Consumer } from "../../../../core/application/event";
import { CompanyDataGateway } from "../../../company/data-gateway";
import { CompanyNameValue } from "../../../company/domain/company-name/CompanyName";
import { CashFlowDataGateway } from "../../data-gateway";
import { CashFlowCreated } from "../../domain/event";

export class CashFlowCreatedConsumer implements Consumer {
	eventName = "CashFlowCreated";
	constructor(
		private readonly cashFlowDataGateway: CashFlowDataGateway,
		private readonly companyDataGateway: CompanyDataGateway,
	) {}
	async handle(event: CashFlowCreated): Promise<void> {
		const { companyName } = await this.companyDataGateway.getByID(
			event.data.accountID.brokerID,
		);
		await this.cashFlowDataGateway.add({
			id: event.data.id,
			account: {
				investorID: event.data.accountID.investorID,
				broker: {
					id: event.data.accountID.brokerID,
					companyName,
				},
			},
			source: event.data.source,
			value: {
				amount: event.data.value.amount,
				currency: event.data.value.currency,
			},
			operation: event.data.operation,
			operationDate: event.data.operationDate,
			settlementDate: event.data.settlementDate,
			createdAt: event.data.createdAt,
		});
	}
}
