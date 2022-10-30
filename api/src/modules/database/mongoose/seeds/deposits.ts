import mongoose from "mongoose";
import {
	DepositDoc,
	DepositMongoDataGateway,
} from "../../../deposit/data-gateway";
import { depositSchema } from "../migrations/deposits";

export const seedDeposits = async (mongoConnection: mongoose.Connection) => {
	const DepositModel =
		mongoConnection.models[DepositMongoDataGateway.depositCollectionName] ||
		mongoConnection.model<DepositDoc>(
			DepositMongoDataGateway.depositCollectionName,
			new mongoose.Schema<DepositDoc>(depositSchema, {
				collection: DepositMongoDataGateway.depositCollectionName,
				strictQuery: "throw",
			}),
		);
	await DepositModel.insertMany([{ _id: "d9ce0396607e408fa925fc691ab9360f" }]);
};
