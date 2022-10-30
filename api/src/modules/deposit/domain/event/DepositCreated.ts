import { DomainEvent } from "../../../../core/domain";
import { CashFlowCreatedData } from "../../../cash-flow/domain/event";
import { NoteValue } from "../note";

export type DepositCreatedData = CashFlowCreatedData & {
	note?: NoteValue;
};
export class DepositCreated extends DomainEvent {
	constructor(public readonly data: DepositCreatedData) {
		super();
	}
}
