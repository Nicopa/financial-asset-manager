import mongoose from "mongoose";
import { MongoDatabase } from "../../database/mongoose";
import { earningSchema } from "../../database/mongoose/migrations/earnings";
import { EarningIDType } from "../domain/id";
import {
	EarningDataGateway,
	EarningDataMap,
	EarningFilters,
} from "./EarningDataGateway";

export type EarningDoc = Omit<EarningDataMap, "id"> & { _id: string };
export class EarningMongoDataGateway
	extends MongoDatabase
	implements EarningDataGateway
{
	public static readonly earningCollectionName = "earnings";
	private readonly _earningModel: mongoose.Model<EarningDoc, {}, {}, {}, any>;
	constructor(database: mongoose.Connection) {
		super(database);
		this._earningModel =
			database.models[EarningMongoDataGateway.earningCollectionName] ||
			database.model<EarningDoc>(
				EarningMongoDataGateway.earningCollectionName,
				new mongoose.Schema<EarningDoc>(earningSchema, {
					collection: EarningMongoDataGateway.earningCollectionName,
					strictQuery: "throw",
				}),
			);
	}
	private getFilteredQuery(filters: EarningFilters) {
		const query = this._earningModel.find().lean();
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
		if (filters.type) query.or(filters.type.map((type) => ({ type })));
		if (filters.quantity) {
			query.where("quantity");
			if (filters.quantityComparisonOperator === "greaterThan")
				query.gt(filters.quantity);
			else if (filters.quantityComparisonOperator === "lessThan")
				query.lt(filters.quantity);
			else if (filters.quantityComparisonOperator === "greaterThanOrEqualTo")
				query.gte(filters.quantity);
			else if (filters.quantityComparisonOperator === "lessThanOrEqualTo")
				query.lte(filters.quantity);
			else query.equals(filters.quantity);
		}
		return query;
	}
	private toData(
		doc: mongoose.LeanDocument<
			Omit<EarningDataMap, "id"> & {
				_id: string;
			} & Required<{
					_id: string;
				}>
		>,
	): EarningDataMap {
		return {
			id: doc._id,
			account: doc.account,
			asset: doc.asset,
			operationDate: doc.operationDate,
			settlementDate: doc.settlementDate,
			createdAt: doc.createdAt,
			quantity: doc.quantity,
			value: doc.value,
			type: doc.type,
		};
	}
	async add(earningData: EarningDataMap): Promise<void> {
		const { id, ...data } = earningData;
		await new this._earningModel({
			_id: id,
			...data,
		}).save();
	}
	async findAll<T>(
		filters: EarningFilters,
		limit: number,
		offset?: number,
	): Promise<EarningDataMap[]> {
		const query = this.getFilteredQuery(filters);
		const earnings = await query
			.limit(limit)
			.sort({ operationDate: "desc", settlementDate: "desc" })
			.skip(offset ?? 0)
			.exec();
		return earnings.map((doc) => this.toData(doc));
	}
	async count(filters: EarningFilters): Promise<number> {
		const query = this.getFilteredQuery(filters);
		return await query.countDocuments();
	}
	async delete(id: EarningIDType): Promise<void> {
		await this._earningModel.deleteOne({ _id: id });
	}
}
