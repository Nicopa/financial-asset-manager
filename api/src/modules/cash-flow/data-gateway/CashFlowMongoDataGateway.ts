import mongoose from "mongoose";
import { cashFlowSchema } from "../../database/mongoose/migrations/cash-flows";
import { MongoDatabase } from "../../database/mongoose";
import { CashFlowIDType } from "../domain/id";
import {
	CashFlowDataGateway,
	CashFlowDataMap,
	CashFlowFilters,
} from "./CashFlowDataGateway";
import { IDNotFound } from "./error";

export type CashFlowDoc = Omit<CashFlowDataMap, "id"> & { _id: string };
export class CashFlowMongoDataGateway
	extends MongoDatabase
	implements CashFlowDataGateway
{
	public static readonly cashFlowCollectionName = "cash-flows";
	private readonly _cashFlowModel: mongoose.Model<CashFlowDoc, {}, {}, {}, any>;
	constructor(database: mongoose.Connection) {
		super(database);
		this._cashFlowModel =
			database.models[CashFlowMongoDataGateway.cashFlowCollectionName] ||
			database.model<CashFlowDoc>(
				CashFlowMongoDataGateway.cashFlowCollectionName,
				new mongoose.Schema<CashFlowDoc>(cashFlowSchema, {
					collection: CashFlowMongoDataGateway.cashFlowCollectionName,
					strictQuery: "throw",
				}),
			);
	}
	private toData(
		doc: mongoose.Document<unknown, any, CashFlowDoc> &
			Omit<CashFlowDataMap, "id"> & {
				_id: string;
			} & Required<{
				_id: string;
			}>,
	): CashFlowDataMap {
		return {
			id: doc._id,
			account: doc.account,
			source: doc.source,
			value: doc.value,
			operation: doc.operation,
			operationDate: doc.operationDate,
			settlementDate: doc.settlementDate,
			createdAt: doc.createdAt,
		};
	}
	private getFilteredQuery(filters: CashFlowFilters) {
		const query = this._cashFlowModel.find();
		if (filters.id) query.where("_id", filters.id);
		if (filters.investorID)
			query.where("account.investorID", filters.investorID);
		if (filters.brokerID)
			query.or(
				filters.brokerID.map((brokerID) => ({ "account.broker.id": brokerID })),
			);
		if (filters.source) query.or(filters.source.map((source) => ({ source })));
		if (filters.valueAmount) {
			query.where("value.amount");
			if (filters.valueAmountComparisonOperator === "greaterThan")
				query.gt(filters.valueAmount);
			else if (filters.valueAmountComparisonOperator === "lessThan")
				query.lt(filters.valueAmount);
			else if (filters.valueAmountComparisonOperator === "greaterThanOrEqualTo")
				query.gte(filters.valueAmount);
			else if (filters.valueAmountComparisonOperator === "lessThanOrEqualTo")
				query.lte(filters.valueAmount);
			else query.equals(filters.valueAmount);
		}
		if (filters.valueCurrency)
			query.or(
				filters.valueCurrency.map((currency) => ({
					"value.currency": currency,
				})),
			);
		if (filters.operation)
			query.or(filters.operation.map((operation) => ({ operation })));
		if (filters.operationDate) {
			let operator = "$eq";
			if (filters.operationDateComparisonOperator === "before")
				operator = "$lt";
			else if (filters.operationDateComparisonOperator === "since")
				operator = "$gte";
			query.where("operationDate", { [operator]: filters.operationDate });
		}
		if (filters.settlementDate) {
			let operator = "$eq";
			if (filters.settlementDateComparisonOperator === "before")
				operator = "$lt";
			else if (filters.settlementDateComparisonOperator === "since")
				operator = "$gte";
			query.where("settlementDate", { [operator]: filters.settlementDate });
		}
		return query;
	}
	async getByID(id: string): Promise<CashFlowDataMap> {
		const data = await this.findByID(id);
		if (!data) throw new IDNotFound();
		return data;
	}
	async findByID(id: string): Promise<CashFlowDataMap | undefined> {
		const cashFlowData = await this._cashFlowModel.where("id", id).findOne();
		if (!cashFlowData) return undefined;
		return this.toData(cashFlowData);
	}
	async add(cashFlowData: CashFlowDataMap): Promise<void> {
		const { id, ...data } = cashFlowData;
		await new this._cashFlowModel({
			_id: id,
			...data,
		}).save();
	}
	async findAll(
		filters: CashFlowFilters,
		limit: number,
		offset?: number,
	): Promise<CashFlowDataMap[]> {
		const query = this.getFilteredQuery(filters);
		const cashFlows = await query
			.limit(limit)
			.sort({
				operationDate: "desc",
				settlementDate: "desc",
				createdAt: "desc",
			})
			.skip(offset ?? 0)
			.exec();
		return cashFlows.map((doc) => this.toData(doc));
	}
	async count(filters: CashFlowFilters): Promise<number> {
		const query = this.getFilteredQuery(filters);
		return await query.countDocuments();
	}
	async delete(id: CashFlowIDType): Promise<void> {
		await this._cashFlowModel.deleteOne({ _id: id });
	}
}
