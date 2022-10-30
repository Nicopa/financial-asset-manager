import { CompanyID, CompanyIDType } from "../../../company/domain/id";

export type BrazilianCompanyIDType = CompanyIDType;
export class BrazilianCompanyID extends CompanyID {
	static create(value: string) {
		return new BrazilianCompanyID(value);
	}
	static load(value: string) {
		return new BrazilianCompanyID(value);
	}
}
