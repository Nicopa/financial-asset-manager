import mongoose from "mongoose";
import { MongoDatabase } from "../../database/mongoose";
import { NoteValue } from "../domain/note";
import { WithdrawIDType } from "../domain/id";
import { WithdrawDataGateway } from "./WithdrawDataGateway";
import { withdrawSchema } from "../../database/mongoose/migrations/withdraws";

export type WithdrawDataMap = {
	id: WithdrawIDType;
	note?: NoteValue;
};
export class WithdrawMongoDataGateway
	extends MongoDatabase
	implements WithdrawDataGateway
{
	public static readonly withdrawCollectionName = "withdraws";
	private readonly _withdrawModel: mongoose.Model<
		WithdrawDataMap,
		{},
		{},
		{},
		any
	>;
	constructor(database: mongoose.Connection) {
		super(database);
		this._withdrawModel =
			database.models[WithdrawMongoDataGateway.withdrawCollectionName] ||
			database.model<WithdrawDataMap>(
				WithdrawMongoDataGateway.withdrawCollectionName,
				new mongoose.Schema<WithdrawDataMap>(withdrawSchema, {
					collection: WithdrawMongoDataGateway.withdrawCollectionName,
					strictQuery: "throw",
				}),
			);
	}
	async add(withdrawData: WithdrawDataMap): Promise<void> {
		const { id, ...data } = withdrawData;
		await new this._withdrawModel({
			_id: id,
			...data,
		}).save();
	}
	async delete(id: WithdrawIDType): Promise<void> {
		await this._withdrawModel.deleteOne({ _id: id });
	}
}
