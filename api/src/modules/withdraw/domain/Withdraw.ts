import { AggregateRoot } from "../../../core/domain";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { CashFlow, CashFlowLoadParams } from "../../cash-flow/domain";
import { Note, NoteValue } from "./note";
import { WithdrawCreated, WithdrawDeleted } from "./event";
import { WithdrawID, WithdrawIDType } from "./id";

export interface WithdrawState {
	readonly cashFlow: CashFlow;
	readonly note?: Note;
}
export type WithdrawLoadParams = Omit<CashFlowLoadParams, "operation"> & {
	note?: NoteValue;
};
export type WithdrawCreateParams = Omit<
	WithdrawLoadParams,
	"id" | "operation" | "createdAt"
>;
export class Withdraw extends AggregateRoot<WithdrawIDType, WithdrawState> {
	constructor(id: WithdrawID, state: WithdrawState) {
		super(id, state);
	}
	public static create(
		{
			accountID,
			value,
			operationDate,
			settlementDate,
			note,
		}: WithdrawCreateParams,
		uUIDProvider: UUIDProvider,
	): Withdraw {
		const cashFlow = CashFlow.create(
			{
				accountID,
				source: "WITHDRAW",
				value,
				operation: "OUT",
				operationDate,
				settlementDate,
			},
			uUIDProvider,
		);
		const withdraw = new Withdraw(WithdrawID.create(cashFlow.id.value), {
			cashFlow,
			note: note ? Note.create(note) : undefined,
		});
		withdraw.addDomainEvent(
			new WithdrawCreated({
				id: withdraw.id.value,
				accountID: withdraw.state.cashFlow.state.accountID,
				source: "WITHDRAW",
				value: {
					amount: withdraw.state.cashFlow.state.value.value.amount,
					currency: withdraw.state.cashFlow.state.value.value.currency,
				},
				operation: withdraw.state.cashFlow.state.operation,
				operationDate: withdraw.state.cashFlow.state.operationDate,
				settlementDate: withdraw.state.cashFlow.state.settlementDate,
				createdAt: withdraw.state.cashFlow.state.createdAt,
				note: withdraw.state.note?.value,
			}),
		);
		return withdraw;
	}
	public static load({
		id,
		accountID,
		value,
		operationDate,
		settlementDate,
		createdAt,
		note,
	}: WithdrawLoadParams) {
		const cashFlow = CashFlow.load({
			id,
			accountID,
			value,
			operation: "OUT",
			operationDate,
			settlementDate,
			createdAt,
		});
		return new Withdraw(WithdrawID.load(cashFlow.id.value), {
			cashFlow,
			note: note ? Note.load(note) : undefined,
		});
	}
	public delete() {
		return [
			this.state.cashFlow.delete(),
			new WithdrawDeleted({
				id: this.id.value,
				accountID: this.state.cashFlow.state.accountID,
				value: this.state.cashFlow.state.value.value,
				operation: this.state.cashFlow.state.operation,
			}),
		];
	}
}
