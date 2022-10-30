import mongoose from "mongoose";
import { MongoDatabase } from "../../database/mongoose";
import {
	TradingDataGateway,
	TradingDataMap,
	TradingFilters,
} from "./TradingDataGateway";
import { TradingIDType } from "../domain/id";
import { tradingSchema } from "../../database/mongoose/migrations/tradings";

export type TradingDoc = Omit<TradingDataMap, "id"> & { _id: string };
export class TradingMongoDataGateway
	extends MongoDatabase
	implements TradingDataGateway
{
	public static readonly tradingCollectionName = "tradings";
	private readonly _tradingModel: mongoose.Model<TradingDoc, {}, {}, {}, any>;
	constructor(database: mongoose.Connection) {
		super(database);
		this._tradingModel =
			database.models[TradingMongoDataGateway.tradingCollectionName] ||
			database.model<TradingDoc>(
				TradingMongoDataGateway.tradingCollectionName,
				new mongoose.Schema<TradingDoc>(tradingSchema, {
					collection: TradingMongoDataGateway.tradingCollectionName,
					strictQuery: "throw",
				}),
			);
	}
	private toData(
		doc: mongoose.LeanDocument<
			Omit<TradingDataMap, "id"> & {
				_id: string;
			} & Required<{
					_id: string;
				}>
		>,
	): TradingDataMap {
		return {
			id: doc._id,
			account: doc.account,
			asset: doc.asset,
			operation: doc.operation,
			operationDate: doc.operationDate,
			settlementDate: doc.settlementDate,
			quantity: doc.quantity,
			grossTotal: doc.grossTotal,
			unitCost: doc.unitCost,
			fee: doc.fee,
			brokerageFee: doc.brokerageFee,
			netTotal: doc.netTotal,
		};
	}
	private getFilteredQuery(filters: TradingFilters) {
		const query = this._tradingModel.find().lean();
		if (filters.id) query.where("_id", filters.id);
		if (filters.investorID)
			query.where("account.investorID", filters.investorID);
		if (filters.brokerID)
			query.or(
				filters.brokerID.map((brokerID) => ({ "account.broker.id": brokerID })),
			);
		if (filters.assetName) query.where("asset.name", filters.assetName);
		if (filters.assetType)
			query.or(filters.assetType.map((type) => ({ "asset.type": type })));
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
		if (filters.currency)
			query.or(
				filters.currency.map((currency) => ({
					"grossTotal.currency": currency,
				})),
			);
		if (filters.grossTotalAmount) {
			query.where("grossTotal.amount");
			if (filters.grossTotalAmountComparisonOperator === "greaterThan")
				query.gt(filters.grossTotalAmount);
			else if (filters.grossTotalAmountComparisonOperator === "lessThan")
				query.lt(filters.grossTotalAmount);
			else if (
				filters.grossTotalAmountComparisonOperator === "greaterThanOrEqualTo"
			)
				query.gte(filters.grossTotalAmount);
			else if (
				filters.grossTotalAmountComparisonOperator === "lessThanOrEqualTo"
			)
				query.lte(filters.grossTotalAmount);
			else query.equals(filters.grossTotalAmount);
		}
		return query;
	}
	async add(tradingData: TradingDataMap): Promise<void> {
		const { id, ...data } = tradingData;
		await new this._tradingModel({
			_id: id,
			...data,
		}).save();
	}
	async findAll<T>(
		filters: TradingFilters,
		limit: number,
		offset?: number,
	): Promise<TradingDataMap[]> {
		const query = this.getFilteredQuery(filters);
		const tradings = await query
			.limit(limit)
			.sort({ operationDate: "desc", settlementDate: "desc" })
			.skip(offset ?? 0)
			.exec();
		return tradings.map((doc) => this.toData(doc));
	}
	async count(filters: TradingFilters): Promise<number> {
		const query = this.getFilteredQuery(filters);
		return await query.countDocuments();
	}
	async delete(id: TradingIDType): Promise<void> {
		await this._tradingModel.deleteOne({ _id: id });
	}
}
