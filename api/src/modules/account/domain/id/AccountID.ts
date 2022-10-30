import { ID } from "../../../../core/domain";
import { BrokerIDType } from "../../../broker/domain/id";
import { InvestorIDType } from "../../../investor/domain/id";

export type AccountIDType = {
	investorID: InvestorIDType;
	brokerID: BrokerIDType;
};
export class AccountID extends ID<AccountIDType> {
	static create(value: AccountIDType) {
		return new AccountID(value);
	}
	static load(value: AccountIDType) {
		return new AccountID(value);
	}
}
