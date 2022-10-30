import { AggregateRoot } from "../../../core/domain";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AssetIDType } from "../../asset/domain/id";
import { CashFlow, CashFlowLoadParams } from "../../cash-flow/domain";
import { EarningType, EarningTypeValue } from "./earning-type";
import { InvalidSettlementDate } from "./error";
import { EarningCreated, EarningDeleted } from "./event";
import { EarningID, EarningIDType } from "./id";
import { Quantity, QuantityValue } from "./quantity";

export interface EarningState {
	readonly cashFlow: CashFlow;
	readonly assetID: AssetIDType;
	readonly type: EarningType;
	readonly quantity: Quantity;
}
export type EarningLoadParams = Omit<CashFlowLoadParams, "operation"> & {
	assetID: AssetIDType;
	type: EarningTypeValue;
	quantity: QuantityValue;
};
export type EarningCreateParams = Omit<
	EarningLoadParams,
	"id" | "operation" | "createdAt"
>;
export class Earning extends AggregateRoot<EarningIDType, EarningState> {
	constructor(id: EarningID, state: EarningState) {
		super(id, state);
	}
	private static validateSettlementDate(
		operationDate: Date,
		settlementDate: Date,
	) {
		if (operationDate.getTime() > settlementDate.getTime())
			throw new InvalidSettlementDate(operationDate, settlementDate);
	}
	public static create(
		{
			accountID,
			value,
			operationDate,
			settlementDate,
			assetID,
			type,
			quantity,
		}: EarningCreateParams,
		uUIDProvider: UUIDProvider,
	): Earning {
		Earning.validateSettlementDate(operationDate, settlementDate);
		const cashFlow = CashFlow.create(
			{
				accountID,
				source: "EARNING",
				value,
				operation: "IN",
				operationDate,
				settlementDate,
			},
			uUIDProvider,
		);
		const earning = new Earning(EarningID.create(cashFlow.id.value), {
			cashFlow,
			assetID,
			type: EarningType.create(type),
			quantity: Quantity.create(quantity),
		});
		earning.addDomainEvent(
			new EarningCreated({
				id: earning.id.value,
				accountID: earning.state.cashFlow.state.accountID,
				source: "EARNING",
				value: {
					amount: earning.state.cashFlow.state.value.value.amount,
					currency: earning.state.cashFlow.state.value.value.currency,
				},
				operation: earning.state.cashFlow.state.operation,
				operationDate: earning.state.cashFlow.state.operationDate,
				settlementDate: earning.state.cashFlow.state.settlementDate,
				createdAt: earning.state.cashFlow.state.createdAt,
				assetID: earning.state.assetID,
				type: earning.state.type.value,
				quantity: earning.state.quantity.value,
			}),
		);
		return earning;
	}
	public static load({
		id,
		accountID,
		value,
		operationDate,
		settlementDate,
		createdAt,
		assetID,
		type,
		quantity,
	}: EarningLoadParams) {
		const cashFlow = CashFlow.load({
			id,
			accountID,
			value,
			operation: "IN",
			operationDate,
			settlementDate,
			createdAt,
		});
		return new Earning(EarningID.load(cashFlow.id.value), {
			cashFlow,
			assetID,
			type: EarningType.load(type),
			quantity: Quantity.load(quantity),
		});
	}
	public delete() {
		return [
			this.state.cashFlow.delete(),
			new EarningDeleted({
				id: this.id.value,
				accountID: this.state.cashFlow.state.accountID,
				value: this.state.cashFlow.state.value.value,
				operation: this.state.cashFlow.state.operation,
			}),
		];
	}
}
