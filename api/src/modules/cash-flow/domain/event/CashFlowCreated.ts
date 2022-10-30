import { DomainEvent } from "../../../../core/domain";
import { AccountIDType } from "../../../account/domain/id";
import { Currency } from "../../../money/domain";
import { CashFlowSource } from "../CashFlow";
import { CashFlowIDType } from "../id";

export type CashFlowCreatedData = {
	id: CashFlowIDType;
	accountID: AccountIDType;
	source: CashFlowSource;
	value: {
		amount: number;
		currency: Currency;
	};
	operation: "IN" | "OUT";
	operationDate: Date;
	settlementDate: Date;
	createdAt: Date;
};
export class CashFlowCreated extends DomainEvent {
	constructor(public readonly data: CashFlowCreatedData) {
		super();
	}
}
