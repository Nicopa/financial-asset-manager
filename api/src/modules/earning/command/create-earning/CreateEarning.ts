import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { UUIDProvider } from "../../../../core/domain/service/uuid";
import { AccountIDType } from "../../../account/domain/id";
import { AccountRepository } from "../../../account/repository";
import { AccountNotFound } from "../../../account/repository/error";
import { AssetIDType } from "../../../asset/domain/id";
import { Currency } from "../../../money/domain";
import { Earning } from "../../domain";
import { EarningTypeValue } from "../../domain/earning-type";
import { QuantityValue } from "../../domain/quantity";
import { EarningRepository } from "../../repository";

export type CreateEarningRequestModel = {
	accountID: AccountIDType;
	value: {
		amount: number;
		currency: Currency;
	};
	operationDate: Date;
	settlementDate: Date;
	assetID: AssetIDType;
	type: EarningTypeValue;
	quantity: QuantityValue;
};
export type CreateEarningResponseModel = void;
export class CreateEarning
	implements Command<CreateEarningRequestModel, CreateEarningResponseModel>
{
	constructor(
		private readonly earningRepository: EarningRepository,
		private readonly accountRepository: AccountRepository,
		private readonly uUIDProvider: UUIDProvider,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		accountID,
		value,
		operationDate,
		settlementDate,
		assetID,
		type,
		quantity,
	}: CreateEarningRequestModel): Promise<CreateEarningResponseModel> {
		try {
			const account = await this.accountRepository.findByID(accountID);
			if (!account) throw new AccountNotFound();
			const earning = Earning.create(
				{
					accountID: account.id.value,
					value,
					operationDate,
					settlementDate,
					assetID,
					type: type as EarningTypeValue,
					quantity,
				},
				this.uUIDProvider,
			);
			await this.earningRepository.add(earning);
			this.eventBroker.publish(earning.state.cashFlow.dispatchEvents());
			this.eventBroker.publish(earning.dispatchEvents());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
