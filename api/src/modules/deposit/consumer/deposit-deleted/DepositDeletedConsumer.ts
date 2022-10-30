import { Consumer } from "../../../../core/application/event";
import { DepositDataGateway } from "../../data-gateway";
import { DepositDeleted } from "../../domain/event";

export class DepositDeletedConsumer implements Consumer {
	eventName: string = "DepositDeleted";
	constructor(private readonly depositDataGateway: DepositDataGateway) {}
	async handle(event: DepositDeleted): Promise<void> {
		await this.depositDataGateway.delete(event.data.id);
	}
}
