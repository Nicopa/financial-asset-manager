import {
	CashFlowDataMap,
	CashFlowKnexRepository,
} from "../../cash-flow/repository";
import { KnexDatabase } from "../../database/knex";
import { Earning } from "../domain";
import { EarningTypeValue } from "../domain/earning-type";
import { EarningIDType } from "../domain/id";
import { EarningRepository } from "./EarningRepository";
import { EarningNotFound } from "./error";

export type EarningDataMap = CashFlowDataMap & {
	assetID: string;
	type: string;
	quantity: number;
};
export class EarningKnexRepository
	extends KnexDatabase
	implements EarningRepository
{
	public static readonly earningTableName = "earnings";
	private toPersistence(earning: Earning): EarningDataMap {
		return {
			id: earning.id.value,
			investorID: earning.state.cashFlow.state.accountID.investorID,
			brokerID: earning.state.cashFlow.state.accountID.brokerID,
			valueAmount: earning.state.cashFlow.state.value.value.amount,
			valueCurrency: earning.state.cashFlow.state.value.value.currency,
			operation: earning.state.cashFlow.state.operation,
			operationDate: earning.state.cashFlow.state.operationDate,
			settlementDate: earning.state.cashFlow.state.settlementDate,
			createdAt: earning.state.cashFlow.state.createdAt,
			assetID: earning.state.assetID,
			type: earning.state.type.value,
			quantity: earning.state.quantity.value,
		};
	}
	private toDomain({
		id,
		investorID,
		brokerID,
		valueAmount,
		valueCurrency,
		operationDate,
		settlementDate,
		createdAt,
		assetID,
		type,
		quantity,
	}: EarningDataMap): Earning {
		return Earning.load({
			id,
			accountID: {
				investorID,
				brokerID,
			},
			operationDate,
			settlementDate,
			value: {
				amount: valueAmount,
				currency: valueCurrency,
			},
			createdAt,
			assetID,
			type: type as EarningTypeValue,
			quantity,
		});
	}
	async add(earning: Earning): Promise<void> {
		await this.database.transaction(async (trx) => {
			const { type, quantity, assetID, ...data } = this.toPersistence(earning);
			await trx(CashFlowKnexRepository.cashFlowTableName).insert(data);
			await trx(EarningKnexRepository.earningTableName).insert({
				id: data.id,
				assetID,
				type,
				quantity,
			});
		});
	}
	private async findBy(
		property: string,
		value: string | number,
	): Promise<Earning | undefined> {
		const earningData = await this.database
			.join(
				CashFlowKnexRepository.cashFlowTableName,
				CashFlowKnexRepository.cashFlowTableName + ".id",
				EarningKnexRepository.earningTableName + ".id",
			)
			.select(
				this.database
					.ref("type")
					.withSchema(EarningKnexRepository.earningTableName),
				this.database
					.ref("quantity")
					.withSchema(EarningKnexRepository.earningTableName),
				this.database
					.ref("*")
					.withSchema(CashFlowKnexRepository.cashFlowTableName),
			)
			.from<EarningDataMap>(EarningKnexRepository.earningTableName)
			.where(EarningKnexRepository.earningTableName + "." + property, value)
			.first();
		if (earningData === undefined) return undefined;
		return this.toDomain(earningData);
	}
	async getByID(id: string): Promise<Earning> {
		const earning = await this.findBy("id", id);
		if (!earning) throw new EarningNotFound();
		return earning;
	}
	async delete(id: EarningIDType): Promise<void> {
		await this.database.transaction(async (trx) => {
			await trx(EarningKnexRepository.earningTableName)
				.where("id", id)
				.delete();
			await trx(CashFlowKnexRepository.cashFlowTableName)
				.where("id", id)
				.delete();
		});
	}
}
