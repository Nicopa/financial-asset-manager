import { AggregateRoot } from "../../../core/domain";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AccountIDType } from "../../account/domain/id";
import { AssetIDType } from "../../asset/domain/id";
import { CashFlow, CashFlowLoadParams } from "../../cash-flow/domain";
import { Currency, MoneyValue } from "../../money/domain";
import { InvalidSettlementDate, NotEqualCurrencies } from "./error";
import { TradingCreated } from "./event";
import { TradingDeleted } from "./event";
import { TradingID, TradingIDType } from "./id";
import { Quantity, QuantityValue } from "./quantity";

export type TradingOperationType = "ACQUISITION" | "DISPOSAL";
export interface TradingState {
	readonly accountID: AccountIDType;
	readonly assetID: AssetIDType;
	readonly operation: TradingOperationType;
	readonly operationDate: Date;
	readonly settlementDate: Date;
	readonly quantity: Quantity;
	readonly grossTotal: CashFlow;
	readonly fee?: CashFlow;
	readonly brokerageFee?: CashFlow;
}
export type TradingLoadParams = {
	id: TradingIDType;
	accountID: AccountIDType;
	assetID: AssetIDType;
	operation: TradingOperationType;
	operationDate: Date;
	settlementDate: Date;
	quantity: QuantityValue;
	grossTotal: CashFlowLoadParams;
	fee?: CashFlowLoadParams;
	brokerageFee?: CashFlowLoadParams;
};
export type TradingCreateParams = {
	accountID: AccountIDType;
	assetID: AssetIDType;
	operation: TradingOperationType;
	operationDate: Date;
	settlementDate: Date;
	quantity: QuantityValue;
	grossTotal: MoneyValue;
	fee?: MoneyValue;
	brokerageFee?: MoneyValue;
};
export class Trading extends AggregateRoot<TradingIDType, TradingState> {
	constructor(id: TradingID, state: TradingState) {
		super(id, state);
	}
	get unitCost(): MoneyValue {
		const unitCost =
			this.state.grossTotal.state.value.value.amount /
			this.state.quantity.value;
		return {
			amount: Number(unitCost.toFixed(2)),
			currency: this.state.grossTotal.state.value.value.currency,
		};
	}
	get netTotal(): MoneyValue {
		let costs = 0;
		if (this.state.fee) costs += this.state.fee.state.value.value.amount;
		if (this.state.brokerageFee)
			costs += this.state.brokerageFee.state.value.value.amount;

		let total = this.state.grossTotal.state.value.value.amount;
		if (this.state.operation === "ACQUISITION") total += costs;
		else total -= costs;
		return {
			amount: total,
			currency: this.state.grossTotal.state.value.value.currency,
		};
	}
	private static validateSettlementDate(
		operationDate: Date,
		settlementDate: Date,
	) {
		if (operationDate.getTime() > settlementDate.getTime())
			throw new InvalidSettlementDate(operationDate, settlementDate);
	}
	private static validateCurrencies(
		grossTotalCurrency: Currency,
		feeCurrency?: Currency,
		brokerageFeeCurrency?: Currency,
	) {
		if (
			(feeCurrency && grossTotalCurrency !== feeCurrency) ||
			(brokerageFeeCurrency && grossTotalCurrency !== brokerageFeeCurrency)
		)
			throw new NotEqualCurrencies(
				grossTotalCurrency,
				feeCurrency,
				brokerageFeeCurrency,
			);
	}
	public static create(
		{
			accountID,
			assetID,
			operation,
			operationDate,
			settlementDate,
			quantity,
			grossTotal,
			fee,
			brokerageFee,
		}: TradingCreateParams,
		uUIDProvider: UUIDProvider,
	): Trading {
		Trading.validateSettlementDate(operationDate, settlementDate);
		Trading.validateCurrencies(
			grossTotal.currency,
			fee?.currency,
			brokerageFee?.currency,
		);
		const trading = new Trading(TradingID.create(uUIDProvider), {
			accountID,
			assetID,
			operation,
			operationDate,
			settlementDate,
			quantity: Quantity.create(quantity),
			grossTotal: CashFlow.create(
				{
					accountID,
					source: "TRADING",
					value: {
						amount: grossTotal.amount,
						currency: grossTotal.currency,
					},
					operation: operation === "DISPOSAL" ? "IN" : "OUT",
					operationDate,
					settlementDate,
				},
				uUIDProvider,
			),
			fee:
				fee && fee.amount
					? CashFlow.create(
							{
								accountID,
								source: "FEE",
								value: {
									amount: fee.amount,
									currency: fee.currency,
								},
								operation: "OUT",
								operationDate,
								settlementDate,
							},
							uUIDProvider,
					  )
					: undefined,
			brokerageFee:
				brokerageFee && brokerageFee.amount
					? CashFlow.create(
							{
								accountID,
								source: "BROKERAGE_FEE",
								value: {
									amount: brokerageFee.amount,
									currency: brokerageFee.currency,
								},
								operation: "OUT",
								operationDate,
								settlementDate,
							},
							uUIDProvider,
					  )
					: undefined,
		});
		trading.addDomainEvent(
			new TradingCreated({
				id: trading.id.value,
				accountID: trading.state.accountID,
				assetID: trading.state.assetID,
				operation: trading.state.operation,
				operationDate: trading.state.operationDate,
				settlementDate: trading.state.settlementDate,
				quantity: trading.state.quantity.value,
				grossTotal: trading.state.grossTotal.state.value.value,
				unitCost: trading.unitCost.amount,
				fee: trading.state.fee?.state.value.value,
				brokerageFee: trading.state.brokerageFee?.state.value.value,
				netTotal: trading.netTotal.amount,
			}),
		);
		return trading;
	}
	public static load({
		id,
		accountID,
		assetID,
		operation,
		operationDate,
		settlementDate,
		quantity,
		grossTotal,
		fee,
		brokerageFee,
	}: TradingLoadParams) {
		return new Trading(TradingID.load(id), {
			accountID,
			assetID,
			operation,
			operationDate,
			settlementDate,
			quantity: Quantity.load(quantity),
			grossTotal: CashFlow.load(grossTotal),
			fee: fee ? CashFlow.load(fee) : undefined,
			brokerageFee: brokerageFee ? CashFlow.load(brokerageFee) : undefined,
		});
	}
	public delete() {
		const domainEvents = [this.state.grossTotal.delete()];
		if (this.state.fee) domainEvents.push(this.state.fee.delete());
		if (this.state.brokerageFee)
			domainEvents.push(this.state.brokerageFee.delete());
		return [
			...domainEvents,
			new TradingDeleted({
				id: this.id.value,
				accountID: this.state.accountID,
			}),
		];
	}
}
