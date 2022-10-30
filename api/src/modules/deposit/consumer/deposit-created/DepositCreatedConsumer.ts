import { Consumer } from "../../../../core/application/event";
import { DepositDataGateway } from "../../data-gateway";
import { DepositCreated } from "../../domain/event";

export class DepositCreatedConsumer implements Consumer {
	eventName: string = "DepositCreated";
	constructor(private readonly depositDataGateway: DepositDataGateway) {}
	async handle(event: DepositCreated): Promise<void> {
		await this.depositDataGateway.add({
			id: event.data.id,
			note: event.data.note,
		});
	}
}
