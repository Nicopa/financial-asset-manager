import { ID } from "../../../../core/domain";
import { InvestorIDType } from "../../../investor/domain/id";

export type WalletIDType = InvestorIDType;
export class WalletID extends ID<WalletIDType> {
	static create(id: WalletIDType) {
		return new WalletID(id);
	}
	static load(value: WalletIDType) {
		return new WalletID(value);
	}
}
