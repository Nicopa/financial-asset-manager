import mongoose from "mongoose";
import { TradingOperationType } from "../../../trading/domain";

export const tradingSchema = {
	_id: { type: String },
	account: {
		investorID: { type: String, required: true },
		broker: {
			id: { type: String, required: true },
			companyName: { type: String, required: true },
		},
	},
	asset: {
		id: { type: String, required: true },
		name: { type: String, required: true },
		type: { type: String, required: true },
	},
	operation: {
		type: String,
		required: true,
		enum: ["ACQUISITION", "DISPOSAL"] as TradingOperationType[],
	},
	operationDate: { type: Date, required: true },
	settlementDate: { type: Date, required: true },
	quantity: { type: Number, required: true },
	grossTotal: {
		amount: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true },
	},
	unitCost: { type: Number, required: true },
	fee: new mongoose.Schema({
		amount: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true },
	}),
	brokerageFee: new mongoose.Schema({
		amount: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true },
	}),
	netTotal: { type: Number, required: true },
};
