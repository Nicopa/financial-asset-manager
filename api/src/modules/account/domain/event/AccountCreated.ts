import { DomainEvent } from "../../../../core/domain";
import { AccountIDType } from "../id";

export type AccountCreatedData = {
	account: {
		id: AccountIDType;
		BRLbalance: number;
		USDbalance: number;
	};
};
export class AccountCreated extends DomainEvent {
	constructor(public readonly data: AccountCreatedData) {
		super();
	}
}
