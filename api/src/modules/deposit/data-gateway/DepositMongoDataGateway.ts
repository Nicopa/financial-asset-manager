import mongoose from "mongoose";
import { MongoDatabase } from "../../database/mongoose";
import { NoteValue } from "../domain/note";
import { DepositIDType } from "../domain/id";
import { DepositDataGateway } from "./DepositDataGateway";
import { depositSchema } from "../../database/mongoose/migrations/deposits";

export type DepositDataMap = {
	id: DepositIDType;
	note?: NoteValue;
};
export type DepositDoc = Omit<DepositDataMap, "id"> & { _id: string };
export class DepositMongoDataGateway
	extends MongoDatabase
	implements DepositDataGateway
{
	public static readonly depositCollectionName = "deposits";
	private readonly _depositModel: mongoose.Model<DepositDoc, {}, {}, {}, any>;
	constructor(database: mongoose.Connection) {
		super(database);
		this._depositModel =
			database.models[DepositMongoDataGateway.depositCollectionName] ||
			database.model<DepositDoc>(
				DepositMongoDataGateway.depositCollectionName,
				new mongoose.Schema<DepositDoc>(depositSchema, {
					collection: DepositMongoDataGateway.depositCollectionName,
					strictQuery: "throw",
				}),
			);
	}
	async add(depositData: DepositDataMap): Promise<void> {
		const { id, ...data } = depositData;
		await new this._depositModel({
			_id: id,
			...data,
		}).save();
	}
	async delete(id: DepositIDType): Promise<void> {
		await this._depositModel.deleteOne({ _id: id });
	}
}
