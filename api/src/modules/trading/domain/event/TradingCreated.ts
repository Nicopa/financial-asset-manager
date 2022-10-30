import { DomainEvent } from "../../../../core/domain";
import { AccountIDType } from "../../../account/domain/id";
import { AssetIDType } from "../../../asset/domain/id";
import { MoneyValue } from "../../../money/domain";
import { TradingIDType } from "../id";
import { QuantityValue } from "../quantity";
import { TradingOperationType } from "../Trading";
export type TradingCreatedData = {
	id: TradingIDType;
	accountID: AccountIDType;
	assetID: AssetIDType;
	operation: TradingOperationType;
	operationDate: Date;
	settlementDate: Date;
	quantity: QuantityValue;
	grossTotal: MoneyValue;
	unitCost: number;
	fee?: MoneyValue;
	brokerageFee?: MoneyValue;
	netTotal: number;
};
export class TradingCreated extends DomainEvent {
	constructor(public readonly data: TradingCreatedData) {
		super();
	}
}
