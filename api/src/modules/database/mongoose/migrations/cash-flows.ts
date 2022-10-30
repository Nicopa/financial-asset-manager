import { CashFlowSource } from "../../../cash-flow/domain";

export const cashFlowSchema = {
	_id: { type: String },
	account: {
		investorID: { type: String, required: true },
		broker: {
			id: { type: String, required: true },
			companyName: { type: String, required: true },
		},
	},
	source: {
		type: String,
		required: true,
		enum: [
			"TRADING",
			"DEPOSIT",
			"WITHDRAW",
			"FEE",
			"BROKERAGE_FEE",
			"EARNING",
		] as CashFlowSource[],
	},
	value: {
		amount: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true },
	},
	operation: {
		type: String,
		required: true,
	},
	operationDate: { type: Date, required: true },
	settlementDate: { type: Date, required: true },
	createdAt: { type: Date, required: true },
};
