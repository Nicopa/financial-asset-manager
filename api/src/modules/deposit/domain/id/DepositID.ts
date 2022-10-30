import { ID } from "../../../../core/domain";
import { CashFlowIDType } from "../../../cash-flow/domain/id";

export type DepositIDType = CashFlowIDType;
export class DepositID extends ID<DepositIDType> {
	static create(value: DepositIDType) {
		return new DepositID(value);
	}
	static load(value: DepositIDType) {
		return new DepositID(value);
	}
}
