import { Consumer } from "../../../../core/application/event";
import { CashFlowDataGateway } from "../../data-gateway";
import { CashFlowDeleted } from "../../domain/event";

export class CashFlowDeletedConsumer implements Consumer {
	eventName: string = "CashFlowDeleted";
	constructor(private readonly cashFlowDataGateway: CashFlowDataGateway) {}
	async handle(event: CashFlowDeleted): Promise<void> {
		await this.cashFlowDataGateway.delete(event.data.id);
	}
}
