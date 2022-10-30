import {
	CashFlowDataMap,
	CashFlowKnexRepository,
} from "../../cash-flow/repository";
import { KnexDatabase } from "../../database/knex";
import { Deposit } from "../domain";
import { DepositIDType } from "../domain/id";
import { DepositRepository } from "./DepositRepository";
import { DepositNotFound } from "./error";

export type DepositDataMap = CashFlowDataMap & {
	note?: string;
};
export class DepositKnexRepository
	extends KnexDatabase
	implements DepositRepository
{
	public static readonly depositTableName = "deposits";
	private toPersistence(deposit: Deposit): DepositDataMap {
		return {
			id: deposit.id.value,
			investorID: deposit.state.cashFlow.state.accountID.investorID,
			brokerID: deposit.state.cashFlow.state.accountID.brokerID,
			valueAmount: deposit.state.cashFlow.state.value.value.amount,
			valueCurrency: deposit.state.cashFlow.state.value.value.currency,
			operation: deposit.state.cashFlow.state.operation,
			operationDate: deposit.state.cashFlow.state.operationDate,
			settlementDate: deposit.state.cashFlow.state.settlementDate,
			createdAt: deposit.state.cashFlow.state.createdAt,
			note: deposit.state.note?.value,
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
	}: DepositDataMap): Deposit {
		return Deposit.load({
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
	async add(deposit: Deposit): Promise<void> {
		await this.database.transaction(async (trx) => {
			const { note, ...data } = this.toPersistence(deposit);
			await trx(CashFlowKnexRepository.cashFlowTableName).insert(data);
			await trx(DepositKnexRepository.depositTableName).insert({
				id: data.id,
				note,
			});
		});
	}
	private async findBy(
		property: string,
		value: string | number,
	): Promise<Deposit | undefined> {
		const depositData = await this.database
			.join(
				CashFlowKnexRepository.cashFlowTableName,
				CashFlowKnexRepository.cashFlowTableName + ".id",
				DepositKnexRepository.depositTableName + ".id",
			)
			.select(
				this.database
					.ref("note")
					.withSchema(DepositKnexRepository.depositTableName),
				this.database
					.ref("*")
					.withSchema(CashFlowKnexRepository.cashFlowTableName),
			)
			.from<DepositDataMap>(DepositKnexRepository.depositTableName)
			.where(DepositKnexRepository.depositTableName + "." + property, value)
			.first();
		if (depositData === undefined) return undefined;
		return this.toDomain(depositData);
	}
	async getByID(id: string): Promise<Deposit> {
		const deposit = await this.findBy("id", id);
		if (!deposit) throw new DepositNotFound();
		return deposit;
	}
	async delete(id: DepositIDType): Promise<void> {
		await this.database.transaction(async (trx) => {
			await trx(DepositKnexRepository.depositTableName)
				.where("id", id)
				.delete();
			await trx(CashFlowKnexRepository.cashFlowTableName)
				.where("id", id)
				.delete();
		});
	}
}
