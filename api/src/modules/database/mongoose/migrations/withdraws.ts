import { CashFlowMongoDataGateway } from "../../../cash-flow/data-gateway";

export const withdrawSchema = {
	_id: {
		type: String,
		ref: CashFlowMongoDataGateway.cashFlowCollectionName,
	},
	note: { type: String },
};
