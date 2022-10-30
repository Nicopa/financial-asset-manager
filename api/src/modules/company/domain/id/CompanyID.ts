import { ID } from "../../../../core/domain";

export type CompanyIDType = string;
export class CompanyID extends ID<CompanyIDType> {
	static create(value: CompanyIDType) {
		return new CompanyID(value);
	}
	static load(value: CompanyIDType) {
		return new CompanyID(value);
	}
}
