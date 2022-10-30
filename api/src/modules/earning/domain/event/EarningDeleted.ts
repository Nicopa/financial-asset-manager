import { DomainEvent } from "../../../../core/domain";
import { CashFlowCreatedData } from "../../../cash-flow/domain/event";

type EarningDeletedData = Omit<
	CashFlowCreatedData,
	"source" | "operationDate" | "settlementDate" | "createdAt"
>;
export class EarningDeleted extends DomainEvent {
	constructor(public readonly data: EarningDeletedData) {
		super();
	}
}
