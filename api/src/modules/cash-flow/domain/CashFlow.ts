import { AggregateRoot } from "../../../core/domain";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AccountIDType } from "../../account/domain/id";
import { Currency, Money } from "../../money/domain";
import { NegativeAmount } from "./error";
import { CashFlowCreated, CashFlowDeleted } from "./event";
import { CashFlowID, CashFlowIDType } from "./id";

export type CashFlowSource =
	| "TRADING"
	| "DEPOSIT"
	| "WITHDRAW"
	| "FEE"
	| "BROKERAGE_FEE"
	| "EARNING";
export type CashFlowOperationType = "IN" | "OUT";
export interface CashFlowState {
	readonly accountID: AccountIDType;
	readonly value: Money;
	readonly operation: CashFlowOperationType;
	readonly operationDate: Date;
	readonly settlementDate: Date;
	readonly createdAt: Date;
}
export type CashFlowLoadParams = {
	id: CashFlowIDType;
	accountID: AccountIDType;
	value: {
		amount: number;
		currency: Currency;
	};
	operation: CashFlowOperationType;
	operationDate: Date;
	settlementDate: Date;
	createdAt: Date;
};
export type CashFlowCreateParams = Omit<
	CashFlowLoadParams,
	"id" | "createdAt"
> & {
	source: CashFlowSource;
};
export class CashFlow extends AggregateRoot<CashFlowIDType, CashFlowState> {
	private static validateAmount(amount: number) {
		if (amount < 0) throw new NegativeAmount(amount);
	}
	public static create(
		{
			accountID,
			source,
			value,
			operation,
			operationDate,
			settlementDate,
		}: CashFlowCreateParams,
		uUIDProvider: UUIDProvider,
	): CashFlow {
		this.validateAmount(value.amount);
		const cashFlow = new CashFlow(CashFlowID.create(uUIDProvider), {
			accountID,
			value: Money.create({ amount: value.amount, currency: value.currency }),
			operation,
			operationDate,
			settlementDate,
			createdAt: new Date(),
		});
		cashFlow.addDomainEvent(
			new CashFlowCreated({
				id: cashFlow.id.value,
				accountID: cashFlow.state.accountID,
				source,
				value: {
					amount: cashFlow.state.value.value.amount,
					currency: cashFlow.state.value.value.currency,
				},
				operation: cashFlow.state.operation,
				operationDate: cashFlow.state.operationDate,
				settlementDate: cashFlow.state.settlementDate,
				createdAt: cashFlow.state.createdAt,
			}),
		);
		return cashFlow;
	}
	public static load({
		id,
		accountID,
		value,
		operation,
		operationDate,
		settlementDate,
		createdAt,
	}: CashFlowLoadParams) {
		return new CashFlow(CashFlowID.load(id), {
			accountID,
			value: Money.load({ amount: value.amount, currency: value.currency }),
			operation,
			operationDate,
			settlementDate,
			createdAt,
		});
	}
	public delete() {
		return new CashFlowDeleted({
			id: this.id.value,
			accountID: this.state.accountID,
			value: this.state.value.value,
			operation: this.state.operation,
		});
	}
}
