import { ID } from "../../../../core/domain";
import { UUIDProvider } from "../../../../core/domain/service/uuid";

export type CashFlowIDType = string;
export class CashFlowID extends ID<CashFlowIDType> {
	static create(uUIDProvider: UUIDProvider) {
		return new CashFlowID(uUIDProvider.generate());
	}
	static load(value: CashFlowIDType) {
		return new CashFlowID(value);
	}
}
