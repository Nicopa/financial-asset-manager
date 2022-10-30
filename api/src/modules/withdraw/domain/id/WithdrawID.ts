import { ID } from "../../../../core/domain";
import { CashFlowIDType } from "../../../cash-flow/domain/id";

export type WithdrawIDType = CashFlowIDType;
export class WithdrawID extends ID<WithdrawIDType> {
	static create(value: WithdrawIDType) {
		return new WithdrawID(value);
	}
	static load(value: WithdrawIDType) {
		return new WithdrawID(value);
	}
}
