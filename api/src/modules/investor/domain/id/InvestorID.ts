import { ID } from "../../../../core/domain";
import { UUIDProvider } from "../../../../core/domain/service/uuid";

export type InvestorIDType = string;
export class InvestorID extends ID<InvestorIDType> {
	static create(uUIDProvider: UUIDProvider) {
		return new InvestorID(uUIDProvider.generate());
	}
	static load(value: InvestorIDType) {
		return new InvestorID(value);
	}
}
