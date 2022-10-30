import { BrokerIDType } from "../../broker/domain/id";
import { TradingNameValue } from "../../company/domain/trading-name";
import { InvestorIDType } from "../../investor/domain/id";
import { AccountIDType } from "../domain/id";
export type AccountDataMap = {
	brokerID: BrokerIDType;
	tradingName: TradingNameValue;
	thumbnail?: Buffer;
	BRLbalance: number;
	USDbalance: number;
};
export interface AccountDataGateway {
	getAllByInvestorID(investorID: InvestorIDType): Promise<AccountDataMap[]>;
}
