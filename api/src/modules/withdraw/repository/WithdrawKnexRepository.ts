import {
	CashFlowDataMap,
	CashFlowKnexRepository,
} from "../../cash-flow/repository";
import { KnexDatabase } from "../../database/knex";
import { Withdraw } from "../domain";
import { WithdrawIDType } from "../domain/id";
import { WithdrawRepository } from "./WithdrawRepository";
import { WithdrawNotFound } from "./error";

export type WithdrawDataMap = CashFlowDataMap & {
	note?: string;
};
export class WithdrawKnexRepository
	extends KnexDatabase
	implements WithdrawRepository
{
	public static readonly withdrawTableName = "withdraws";
	private toPersistence(withdraw: Withdraw): WithdrawDataMap {
		return {
			id: withdraw.id.value,
			investorID: withdraw.state.cashFlow.state.accountID.investorID,
			brokerID: withdraw.state.cashFlow.state.accountID.brokerID,
			valueAmount: withdraw.state.cashFlow.state.value.value.amount,
			valueCurrency: withdraw.state.cashFlow.state.value.value.currency,
			operation: withdraw.state.cashFlow.state.operation,
			operationDate: withdraw.state.cashFlow.state.operationDate,
			settlementDate: withdraw.state.cashFlow.state.settlementDate,
			createdAt: withdraw.state.cashFlow.state.createdAt,
			note: withdraw.state.note?.value,
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
		note,
	}: WithdrawDataMap): Withdraw {
		return Withdraw.load({
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
			note,
		});
	}
	async add(withdraw: Withdraw): Promise<void> {
		await this.database.transaction(async (trx) => {
			const { note, ...data } = this.toPersistence(withdraw);
			await trx(CashFlowKnexRepository.cashFlowTableName).insert(data);
			await trx(WithdrawKnexRepository.withdrawTableName).insert({
				id: data.id,
				note,
			});
		});
	}
	async findBy(
		property: string,
		value: string | number,
	): Promise<Withdraw | undefined> {
		const withdrawData = await this.database
			.join(
				CashFlowKnexRepository.cashFlowTableName,
				CashFlowKnexRepository.cashFlowTableName + ".id",
				WithdrawKnexRepository.withdrawTableName + ".id",
			)
			.select(
				this.database
					.ref("note")
					.withSchema(WithdrawKnexRepository.withdrawTableName),
				this.database
					.ref("*")
					.withSchema(CashFlowKnexRepository.cashFlowTableName),
			)
			.from<WithdrawDataMap>(WithdrawKnexRepository.withdrawTableName)
			.where(WithdrawKnexRepository.withdrawTableName + "." + property, value)
			.first();
		if (withdrawData === undefined) return undefined;
		return this.toDomain(withdrawData);
	}
	async getByID(id: string): Promise<Withdraw> {
		const withdraw = await this.findBy("id", id);
		if (!withdraw) throw new WithdrawNotFound();
		return withdraw;
	}
	async delete(id: WithdrawIDType): Promise<void> {
		await this.database.transaction(async (trx) => {
			await trx(WithdrawKnexRepository.withdrawTableName)
				.where("id", id)
				.delete();
			await trx(CashFlowKnexRepository.cashFlowTableName)
				.where("id", id)
				.delete();
		});
	}
}
