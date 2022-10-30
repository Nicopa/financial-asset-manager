import { DomainEvent } from "../../../../core/domain";
import { CashFlowCreatedData } from "../../../cash-flow/domain/event";
import { NoteValue } from "../note";

export type WithdrawCreatedData = CashFlowCreatedData & {
	note?: NoteValue;
};
export class WithdrawCreated extends DomainEvent {
	constructor(public readonly data: WithdrawCreatedData) {
		super();
	}
}
