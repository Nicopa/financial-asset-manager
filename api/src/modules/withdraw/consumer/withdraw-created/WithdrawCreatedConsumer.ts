import { Consumer } from "../../../../core/application/event";
import { WithdrawDataGateway } from "../../data-gateway";
import { WithdrawCreated } from "../../domain/event";

export class WithdrawCreatedConsumer implements Consumer {
	eventName: string = "WithdrawCreated";
	constructor(private readonly withdrawDataGateway: WithdrawDataGateway) {}
	async handle(event: WithdrawCreated): Promise<void> {
		await this.withdrawDataGateway.add({
			id: event.data.id,
			note: event.data.note,
		});
	}
}
