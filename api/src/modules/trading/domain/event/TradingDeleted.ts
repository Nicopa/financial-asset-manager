import { DomainEvent } from "../../../../core/domain";
import { AccountIDType } from "../../../account/domain/id";
import { TradingIDType } from "../id";

type TradingDeletedData = {
	id: TradingIDType;
	accountID: AccountIDType;
};
export class TradingDeleted extends DomainEvent {
	constructor(public readonly data: TradingDeletedData) {
		super();
	}
}
