import { Consumer } from "../../../../core/application/event";
import { EarningDataGateway } from "../../data-gateway";
import { EarningDeleted } from "../../domain/event";

export class EarningDeletedConsumer implements Consumer {
	eventName: string = "EarningDeleted";
	constructor(private readonly earningDataGateway: EarningDataGateway) {}
	async handle(event: EarningDeleted): Promise<void> {
		await this.earningDataGateway.delete(event.data.id);
	}
}
