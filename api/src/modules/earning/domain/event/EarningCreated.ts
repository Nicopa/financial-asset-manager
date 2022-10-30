import { DomainEvent } from "../../../../core/domain";
import { AssetIDType } from "../../../asset/domain/id";
import { CashFlowCreatedData } from "../../../cash-flow/domain/event";
import { EarningTypeValue } from "../earning-type";
import { QuantityValue } from "../quantity";
export type EarningCreatedData = CashFlowCreatedData & {
	assetID: AssetIDType;
	type: EarningTypeValue;
	quantity: QuantityValue;
};
export class EarningCreated extends DomainEvent {
	constructor(public readonly data: EarningCreatedData) {
		super();
	}
}
