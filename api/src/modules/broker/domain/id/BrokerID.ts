import {
	BrazilianCompanyID,
	BrazilianCompanyIDType,
} from "../../../brazilian-company/domain/id";

export type BrokerIDType = BrazilianCompanyIDType;
export class BrokerID extends BrazilianCompanyID {
	static create(value: BrokerIDType) {
		return new BrokerID(value);
	}
	static load(value: BrokerIDType) {
		return new BrokerID(value);
	}
}
