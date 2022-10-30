import { CashFlowMongoDataGateway } from "../../../cash-flow/data-gateway";
import { EarningTypeValue } from "../../../earning/domain/earning-type";

export const earningSchema = {
	_id: {
		type: String,
		ref: CashFlowMongoDataGateway.cashFlowCollectionName,
	},
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
	type: {
		type: String,
		required: true,
		enum: ["AMORTIZATION", "DIVIDEND", "INCOME", "JCP"] as EarningTypeValue[],
	},
	value: {
		amount: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true },
	},
	quantity: { type: Number, required: true },
	operationDate: { type: Date, required: true },
	settlementDate: { type: Date, required: true },
	createdAt: { type: Date, required: true },
};
