import { CashFlowMongoDataGateway } from "../../../cash-flow/data-gateway";

export const depositSchema = {
	_id: {
		type: String,
		ref: CashFlowMongoDataGateway.cashFlowCollectionName,
	},
	note: { type: String },
};
