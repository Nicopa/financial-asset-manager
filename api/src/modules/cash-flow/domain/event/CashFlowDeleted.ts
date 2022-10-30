import { DomainEvent } from "../../../../core/domain";
import { AccountIDType } from "../../../account/domain/id";
import { Currency } from "../../../money/domain";
import { CashFlowIDType } from "../id";

type CashFlowDeletedData = {
	id: CashFlowIDType;
	accountID: AccountIDType;
	value: {
		amount: number;
		currency: Currency;
	};
	operation: "IN" | "OUT";
};
export class CashFlowDeleted extends DomainEvent {
	constructor(public readonly data: CashFlowDeletedData) {
		super();
	}
}
