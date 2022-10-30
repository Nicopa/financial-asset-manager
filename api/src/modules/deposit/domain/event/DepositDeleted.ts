import { DomainEvent } from "../../../../core/domain";
import { CashFlowCreatedData } from "../../../cash-flow/domain/event";

type DepositDeletedData = Omit<
	CashFlowCreatedData,
	"source" | "operationDate" | "settlementDate" | "createdAt"
>;
export class DepositDeleted extends DomainEvent {
	constructor(public readonly data: DepositDeletedData) {
		super();
	}
}
