import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { InvestorIDType } from "../../../investor/domain/id";
import { BrokerDataGateway } from "../../data-gateway";
import { BrokerIDType } from "../../domain/id";

export type GetBrokersForInvestorAccountRequestModel = {
	investorID: InvestorIDType;
};
export type GetBrokersForInvestorAccountResponseModel = {
	id: BrokerIDType;
	tradingName: string;
}[];
export class GetBrokersForInvestorAccount
	implements
		Query<
			GetBrokersForInvestorAccountRequestModel,
			GetBrokersForInvestorAccountResponseModel
		>
{
	constructor(private readonly brokerDataGateway: BrokerDataGateway) {}
	async get({
		investorID,
	}: GetBrokersForInvestorAccountRequestModel): Promise<GetBrokersForInvestorAccountResponseModel> {
		try {
			return await this.brokerDataGateway.getAllAvailableForInvestorAccount<
				GetBrokersForInvestorAccountResponseModel[number]
			>(investorID);
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
