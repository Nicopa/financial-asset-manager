import { InvestorIDType } from "../../investor/domain/id";
import { BrokerIDType } from "../domain/id";

export interface BrokerDataGateway {
	getAllAvailableForInvestorAccount<T extends {}>(
		investorID: InvestorIDType,
	): Promise<T[]>;
	getByID<T extends {}>(id: BrokerIDType): Promise<T>;
	findByID<T extends {}>(id: BrokerIDType): Promise<T | undefined>;
}
