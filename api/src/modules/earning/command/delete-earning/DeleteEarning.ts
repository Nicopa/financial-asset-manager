import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { EarningIDType } from "../../domain/id";
import { EarningRepository } from "../../repository";

export type DeleteEarningRequestModel = {
	id: EarningIDType;
};
export type DeleteEarningResponseModel = void;
export class DeleteEarning
	implements Command<DeleteEarningRequestModel, DeleteEarningResponseModel>
{
	constructor(
		private readonly earningRepository: EarningRepository,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		id,
	}: DeleteEarningRequestModel): Promise<DeleteEarningResponseModel> {
		try {
			const earning = await this.earningRepository.getByID(id);
			await this.earningRepository.delete(earning.id.value);
			this.eventBroker.publish(earning.delete());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
