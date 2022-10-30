import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { BrokerIDType } from "../../../broker/domain/id";
import { InvestorIDType } from "../../../investor/domain/id";
import { AccountDataGateway } from "../../data-gateway";

export type GetAccountsRequestModel = {
	investorID: InvestorIDType;
};
export type GetAccountsResponseModel = {
	id: BrokerIDType;
	tradingName: string;
	thumbnail?: string;
	BRLbalance: number;
	USDbalance: number;
}[];

export class GetAccounts
	implements Query<GetAccountsRequestModel, GetAccountsResponseModel>
{
	constructor(private readonly accountDataGateway: AccountDataGateway) {}
	async get({
		investorID,
	}: GetAccountsRequestModel): Promise<GetAccountsResponseModel> {
		try {
			const accountsData = await this.accountDataGateway.getAllByInvestorID(
				investorID,
			);
			return accountsData.map(({ brokerID, thumbnail, ...data }) => ({
				...data,
				id: brokerID,
				thumbnail: thumbnail ? thumbnail.toString() : undefined,
			}));
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
