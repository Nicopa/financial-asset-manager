import { AssetIDType } from "../../asset/domain/id";
import { BrokerIDType } from "../../broker/domain/id";
import { CashFlowIDType } from "../../cash-flow/domain/id";
import {
	CashFlowDataMap,
	CashFlowKnexRepository,
} from "../../cash-flow/repository";
import { KnexDatabase } from "../../database/knex";
import { InvestorIDType } from "../../investor/domain/id";
import { Trading, TradingOperationType } from "../domain";
import { TradingIDType } from "../domain/id";
import { QuantityValue } from "../domain/quantity";
import { TradingNotFound } from "./error";
import { TradingRepository } from "./TradingRepository";

export type TradingDataMap = {
	tradingData: {
		id: TradingIDType;
		investorID: InvestorIDType;
		brokerID: BrokerIDType;
		assetID: AssetIDType;
		operation: TradingOperationType;
		operationDate: Date;
		settlementDate: Date;
		quantity: QuantityValue;
		grossTotalCashFlowID: CashFlowIDType;
		feeCashFlowID?: CashFlowIDType;
		brokerageFeeCashFlowID?: CashFlowIDType;
	};
	cashFlowData: {
		grossTotal: CashFlowDataMap;
		fee?: CashFlowDataMap;
		brokerageFee?: CashFlowDataMap;
	};
};
export class TradingKnexRepository
	extends KnexDatabase
	implements TradingRepository
{
	public static readonly tradingTableName = "tradings";
	private toDomain({
		tradingData: {
			id,
			investorID,
			brokerID,
			assetID,
			operation,
			operationDate,
			settlementDate,
			quantity,
		},
		cashFlowData: { grossTotal, fee, brokerageFee },
	}: TradingDataMap): Trading {
		return Trading.load({
			id,
			accountID: {
				investorID,
				brokerID,
			},
			assetID,
			operation,
			operationDate,
			settlementDate,
			quantity,
			grossTotal: {
				id: grossTotal.id,
				accountID: {
					investorID: grossTotal.investorID,
					brokerID: grossTotal.brokerID,
				},
				value: {
					amount: grossTotal.valueAmount,
					currency: grossTotal.valueCurrency,
				},
				operation: grossTotal.operation,
				operationDate: grossTotal.operationDate,
				settlementDate: grossTotal.settlementDate,
				createdAt: grossTotal.createdAt,
			},
			fee: fee
				? {
						id: fee.id,
						accountID: {
							investorID: fee.investorID,
							brokerID: fee.brokerID,
						},
						value: {
							amount: fee.valueAmount,
							currency: fee.valueCurrency,
						},
						operation: fee.operation,
						operationDate: fee.operationDate,
						settlementDate: fee.settlementDate,
						createdAt: fee.createdAt,
				  }
				: undefined,
			brokerageFee: brokerageFee
				? {
						id: brokerageFee.id,
						accountID: {
							investorID: brokerageFee.investorID,
							brokerID: brokerageFee.brokerID,
						},
						value: {
							amount: brokerageFee.valueAmount,
							currency: brokerageFee.valueCurrency,
						},
						operation: brokerageFee.operation,
						operationDate: brokerageFee.operationDate,
						settlementDate: brokerageFee.settlementDate,
						createdAt: brokerageFee.createdAt,
				  }
				: undefined,
		});
	}
	private toPersistence(trading: Trading): TradingDataMap {
		return {
			tradingData: {
				id: trading.id.value,
				investorID: trading.state.accountID.investorID,
				brokerID: trading.state.accountID.brokerID,
				assetID: trading.state.assetID,
				operation: trading.state.operation,
				operationDate: trading.state.operationDate,
				settlementDate: trading.state.settlementDate,
				quantity: trading.state.quantity.value,
				grossTotalCashFlowID: trading.state.grossTotal.id.value,
				feeCashFlowID: trading.state.fee?.id.value,
				brokerageFeeCashFlowID: trading.state.brokerageFee?.id.value,
			},
			cashFlowData: {
				grossTotal: {
					id: trading.state.grossTotal.id.value,
					investorID: trading.state.grossTotal.state.accountID.investorID,
					brokerID: trading.state.grossTotal.state.accountID.brokerID,
					valueAmount: trading.state.grossTotal.state.value.value.amount,
					valueCurrency: trading.state.grossTotal.state.value.value.currency,
					operation: trading.state.grossTotal.state.operation,
					operationDate: trading.state.grossTotal.state.operationDate,
					settlementDate: trading.state.grossTotal.state.settlementDate,
					createdAt: trading.state.grossTotal.state.createdAt,
				},
				fee: trading.state.fee
					? {
							id: trading.state.fee.id.value,
							investorID: trading.state.fee.state.accountID.investorID,
							brokerID: trading.state.fee.state.accountID.brokerID,
							valueAmount: trading.state.fee.state.value.value.amount,
							valueCurrency: trading.state.fee.state.value.value.currency,
							operation: trading.state.fee.state.operation,
							operationDate: trading.state.fee.state.operationDate,
							settlementDate: trading.state.fee.state.settlementDate,
							createdAt: trading.state.fee.state.createdAt,
					  }
					: undefined,
				brokerageFee: trading.state.brokerageFee
					? {
							id: trading.state.brokerageFee.id.value,
							investorID: trading.state.brokerageFee.state.accountID.investorID,
							brokerID: trading.state.brokerageFee.state.accountID.brokerID,
							valueAmount: trading.state.brokerageFee.state.value.value.amount,
							valueCurrency:
								trading.state.brokerageFee.state.value.value.currency,
							operation: trading.state.brokerageFee.state.operation,
							operationDate: trading.state.brokerageFee.state.operationDate,
							settlementDate: trading.state.brokerageFee.state.settlementDate,
							createdAt: trading.state.brokerageFee.state.createdAt,
					  }
					: undefined,
			},
		};
	}
	async add(trading: Trading): Promise<void> {
		await this.database.transaction(async (trx) => {
			const { tradingData, cashFlowData } = this.toPersistence(trading);
			await trx(CashFlowKnexRepository.cashFlowTableName).insert(
				cashFlowData.grossTotal,
			);
			if (cashFlowData.fee)
				await trx(CashFlowKnexRepository.cashFlowTableName).insert(
					cashFlowData.fee,
				);
			if (cashFlowData.brokerageFee)
				await trx(CashFlowKnexRepository.cashFlowTableName).insert(
					cashFlowData.brokerageFee,
				);
			await trx(TradingKnexRepository.tradingTableName).insert(tradingData);
		});
	}
	private async findBy(
		property: string,
		value: string | number,
	): Promise<Trading | undefined> {
		const tradingData = await this.database
			.select("*")
			.from<TradingDataMap["tradingData"]>(
				TradingKnexRepository.tradingTableName,
			)
			.where(TradingKnexRepository.tradingTableName + "." + property, value)
			.first();
		if (tradingData === undefined) return undefined;
		const grossTotalData = await this.database
			.select("*")
			.from<CashFlowDataMap>(CashFlowKnexRepository.cashFlowTableName)
			.where(
				CashFlowKnexRepository.cashFlowTableName + ".id",
				tradingData.grossTotalCashFlowID,
			)
			.first();
		const feeData = tradingData.feeCashFlowID
			? await this.database
					.select("*")
					.from<CashFlowDataMap>(CashFlowKnexRepository.cashFlowTableName)
					.where(
						CashFlowKnexRepository.cashFlowTableName + ".id",
						tradingData.feeCashFlowID,
					)
					.first()
			: undefined;
		const brokerageFeeData = tradingData.brokerageFeeCashFlowID
			? await this.database
					.select("*")
					.from<CashFlowDataMap>(CashFlowKnexRepository.cashFlowTableName)
					.where(
						CashFlowKnexRepository.cashFlowTableName + ".id",
						tradingData.brokerageFeeCashFlowID,
					)
					.first()
			: undefined;
		return this.toDomain({
			tradingData,
			cashFlowData: {
				grossTotal: grossTotalData!,
				fee: feeData,
				brokerageFee: brokerageFeeData,
			},
		});
	}
	async getByID(id: string): Promise<Trading> {
		const trading = await this.findBy("id", id);
		if (!trading) throw new TradingNotFound();
		return trading;
	}
	async delete(id: TradingIDType): Promise<void> {
		const tradingData = await this.database
			.select("*")
			.from<TradingDataMap["tradingData"]>(
				TradingKnexRepository.tradingTableName,
			)
			.where("id", id)
			.first();
		if (tradingData === undefined) throw new TradingNotFound();
		await this.database.transaction(async (trx) => {
			await trx(TradingKnexRepository.tradingTableName)
				.where("id", id)
				.delete();
			await trx(CashFlowKnexRepository.cashFlowTableName)
				.where("id", tradingData.grossTotalCashFlowID)
				.delete();
			if (tradingData.feeCashFlowID)
				await trx(CashFlowKnexRepository.cashFlowTableName)
					.where("id", tradingData.feeCashFlowID)
					.delete();
			if (tradingData.brokerageFeeCashFlowID)
				await trx(CashFlowKnexRepository.cashFlowTableName)
					.where("id", tradingData.brokerageFeeCashFlowID)
					.delete();
		});
	}
}
