import { AggregateRoot } from "../../../core/domain";
import { CompanyName, CompanyNameValue } from "./company-name/CompanyName";
import { CompanyID, CompanyIDType } from "./id";
import { TradingName, TradingNameValue } from "./trading-name/TradingName";

export interface CompanyState {
	readonly companyName: CompanyName;
	readonly tradingName: TradingName;
}
export type CompanyParams = {
	id: string;
	companyName: CompanyNameValue;
	tradingName: TradingNameValue;
};
export class Company extends AggregateRoot<CompanyIDType, CompanyState> {
	protected constructor(id: CompanyID, state: CompanyState) {
		super(id, state);
	}
}
