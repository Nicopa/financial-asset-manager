import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { WalletRepository } from "../../../wallet/repository";
import { TradingIDType } from "../../domain/id";
import { TradingRepository } from "../../repository";

export type DeleteTradingRequestModel = {
	investorID: string;
	id: TradingIDType;
};
export type DeleteTradingResponseModel = void;
export class DeleteTrading
	implements Command<DeleteTradingRequestModel, DeleteTradingResponseModel>
{
	constructor(
		private readonly tradingRepository: TradingRepository,
		private readonly walletRepository: WalletRepository,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		investorID,
		id,
	}: DeleteTradingRequestModel): Promise<DeleteTradingResponseModel> {
		try {
			const wallet = await this.walletRepository.getByID(investorID);
			wallet.delete(id);
			await this.walletRepository.update(wallet);
			const trading = await this.tradingRepository.getByID(id);
			await this.tradingRepository.delete(trading.id.value);
			const events = trading.delete();
			this.eventBroker.publish(events);
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
