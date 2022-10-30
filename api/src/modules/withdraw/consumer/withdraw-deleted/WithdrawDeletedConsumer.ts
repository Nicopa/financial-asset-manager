import { Consumer } from "../../../../core/application/event";
import { WithdrawDataGateway } from "../../data-gateway";
import { WithdrawDeleted } from "../../domain/event";

export class WithdrawDeletedConsumer implements Consumer {
	eventName: string = "WithdrawDeleted";
	constructor(private readonly withdrawDataGateway: WithdrawDataGateway) {}
	async handle(event: WithdrawDeleted): Promise<void> {
		await this.withdrawDataGateway.delete(event.data.id);
	}
}
