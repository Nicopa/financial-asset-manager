import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { WithdrawIDType } from "../../domain/id";
import { WithdrawRepository } from "../../repository";

export type DeleteWithdrawRequestModel = {
	id: WithdrawIDType;
};
export type DeleteWithdrawResponseModel = void;
export class DeleteWithdraw
	implements Command<DeleteWithdrawRequestModel, DeleteWithdrawResponseModel>
{
	constructor(
		private readonly withdrawRepository: WithdrawRepository,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		id,
	}: DeleteWithdrawRequestModel): Promise<DeleteWithdrawResponseModel> {
		try {
			const withdraw = await this.withdrawRepository.getByID(id);
			await this.withdrawRepository.delete(withdraw.id.value);
			this.eventBroker.publish(withdraw.delete());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
