import { ID } from "../../../../core/domain";
import { CashFlowIDType } from "../../../cash-flow/domain/id";

export type EarningIDType = CashFlowIDType;
export class EarningID extends ID<EarningIDType> {
	static create(value: EarningIDType) {
		return new EarningID(value);
	}
	static load(value: EarningIDType) {
		return new EarningID(value);
	}
}
