import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { DepositIDType } from "../../domain/id";
import { DepositRepository } from "../../repository";

export type DeleteDepositRequestModel = {
	id: DepositIDType;
};
export type DeleteDepositResponseModel = void;
export class DeleteDeposit
	implements Command<DeleteDepositRequestModel, DeleteDepositResponseModel>
{
	constructor(
		private readonly depositRepository: DepositRepository,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		id,
	}: DeleteDepositRequestModel): Promise<DeleteDepositResponseModel> {
		try {
			const deposit = await this.depositRepository.getByID(id);
			await this.depositRepository.delete(deposit.id.value);
			this.eventBroker.publish(deposit.delete());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
