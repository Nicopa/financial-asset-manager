import { Consumer } from "../../../../core/application/event";
import { TradingDataGateway } from "../../data-gateway";
import { TradingDeleted } from "../../domain/event";

export class TradingDeletedConsumer implements Consumer {
	eventName: string = "TradingDeleted";
	constructor(private readonly tradingDataGateway: TradingDataGateway) {}
	async handle(event: TradingDeleted): Promise<void> {
		await this.tradingDataGateway.delete(event.data.id);
	}
}
