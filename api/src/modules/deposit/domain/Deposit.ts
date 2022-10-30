import { AggregateRoot } from "../../../core/domain";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { CashFlow, CashFlowLoadParams } from "../../cash-flow/domain";
import { Note, NoteValue } from "./note";
import { DepositCreated, DepositDeleted } from "./event";
import { DepositID, DepositIDType } from "./id";

export interface DepositState {
	readonly cashFlow: CashFlow;
	readonly note?: Note;
}
export type DepositLoadParams = Omit<CashFlowLoadParams, "operation"> & {
	note?: NoteValue;
};
export type DepositCreateParams = Omit<
	DepositLoadParams,
	"id" | "operation" | "createdAt"
>;
export class Deposit extends AggregateRoot<DepositIDType, DepositState> {
	constructor(id: DepositID, state: DepositState) {
		super(id, state);
	}
	public static create(
		{
			accountID,
			value,
			operationDate,
			settlementDate,
			note,
		}: DepositCreateParams,
		uUIDProvider: UUIDProvider,
	): Deposit {
		const cashFlow = CashFlow.create(
			{
				accountID,
				source: "DEPOSIT",
				value,
				operation: "IN",
				operationDate,
				settlementDate,
			},
			uUIDProvider,
		);
		const deposit = new Deposit(DepositID.create(cashFlow.id.value), {
			cashFlow,
			note: note ? Note.create(note) : undefined,
		});
		deposit.addDomainEvent(
			new DepositCreated({
				id: deposit.id.value,
				accountID: deposit.state.cashFlow.state.accountID,
				source: "DEPOSIT",
				value: {
					amount: deposit.state.cashFlow.state.value.value.amount,
					currency: deposit.state.cashFlow.state.value.value.currency,
				},
				operation: deposit.state.cashFlow.state.operation,
				operationDate: deposit.state.cashFlow.state.operationDate,
				settlementDate: deposit.state.cashFlow.state.settlementDate,
				createdAt: deposit.state.cashFlow.state.createdAt,
				note: deposit.state.note?.value,
			}),
		);
		return deposit;
	}
	public static load({
		id,
		accountID,
		value,
		operationDate,
		settlementDate,
		createdAt,
		note,
	}: DepositLoadParams) {
		const cashFlow = CashFlow.load({
			id,
			accountID,
			value,
			operation: "IN",
			operationDate,
			settlementDate,
			createdAt,
		});
		return new Deposit(DepositID.load(cashFlow.id.value), {
			cashFlow,
			note: note ? Note.load(note) : undefined,
		});
	}
	public delete() {
		return [
			this.state.cashFlow.delete(),
			new DepositDeleted({
				id: this.id.value,
				accountID: this.state.cashFlow.state.accountID,
				value: this.state.cashFlow.state.value.value,
				operation: this.state.cashFlow.state.operation,
			}),
		];
	}
}
