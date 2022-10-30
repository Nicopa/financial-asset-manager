import { Command } from "../../../../core/application";
import { EventBroker } from "../../../../core/application/event";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { UUIDProvider } from "../../../../core/domain/service/uuid";
import { AccountIDType } from "../../../account/domain/id";
import { AccountRepository } from "../../../account/repository";
import { AccountNotFound } from "../../../account/repository/error";
import { AssetIDType } from "../../../asset/domain/id";
import { AssetRepository } from "../../../asset/repository";
import { AssetNotFound } from "../../../asset/repository/error";
import { CashFlow } from "../../../cash-flow/domain";
import { MoneyValue } from "../../../money/domain";
import { Trading, TradingOperationType } from "../../domain";
import { QuantityValue } from "../../domain/quantity";
import { TradingRepository } from "../../repository";

export type CreateTradingRequestModel = {
	accountID: AccountIDType;
	assetID: AssetIDType;
	operation: TradingOperationType;
	operationDate: Date;
	settlementDate: Date;
	quantity: QuantityValue;
	grossTotal: MoneyValue;
	fee?: MoneyValue;
	brokerageFee?: MoneyValue;
};
export type CreateTradingResponseModel = void;
export class CreateTrading
	implements Command<CreateTradingRequestModel, CreateTradingResponseModel>
{
	constructor(
		private readonly tradingRepository: TradingRepository,
		private readonly accountRepository: AccountRepository,
		private readonly assetRepository: AssetRepository,
		private readonly uUIDPRovider: UUIDProvider,
		private readonly eventBroker: EventBroker,
	) {}
	async execute({
		accountID,
		assetID,
		operation,
		operationDate,
		settlementDate,
		quantity,
		grossTotal,
		fee,
		brokerageFee,
	}: CreateTradingRequestModel): Promise<CreateTradingResponseModel> {
		try {
			const account = await this.accountRepository.findByID(accountID);
			if (!account) throw new AccountNotFound();
			const asset = await this.assetRepository.findByID(assetID);
			if (!asset) throw new AssetNotFound();
			const trading = Trading.create(
				{
					accountID: account.id.value,
					assetID: asset.id.value,
					operation,
					operationDate,
					settlementDate,
					quantity,
					grossTotal,
					fee,
					brokerageFee,
				},
				this.uUIDPRovider,
			);
			await this.tradingRepository.add(trading);
			this.eventBroker.publish(trading.state.grossTotal.dispatchEvents());
			if (trading.state.fee)
				this.eventBroker.publish(trading.state.fee.dispatchEvents());
			if (trading.state.brokerageFee)
				this.eventBroker.publish(trading.state.brokerageFee.dispatchEvents());
			this.eventBroker.publish(trading.dispatchEvents());
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
