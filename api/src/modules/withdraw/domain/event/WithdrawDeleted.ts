import { DomainEvent } from "../../../../core/domain";
import { CashFlowCreatedData } from "../../../cash-flow/domain/event";

type WithdrawDeletedData = Omit<
	CashFlowCreatedData,
	"source" | "operationDate" | "settlementDate" | "createdAt"
>;
export class WithdrawDeleted extends DomainEvent {
	constructor(public readonly data: WithdrawDeletedData) {
		super();
	}
}
