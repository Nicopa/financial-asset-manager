import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { AuthProvider } from "../../../auth";
import { InvestorDataGateway } from "../../data-gateway";

export type GetInvestorAuthRequestModel = {
	token: string;
};
export type GetInvestorAuthResponseModel = {
	investorID: string;
};
export class GetInvestorAuth
	implements Query<GetInvestorAuthRequestModel, GetInvestorAuthResponseModel>
{
	constructor(
		private readonly investorDataGateway: InvestorDataGateway,
		private readonly authProvider: AuthProvider,
	) {}
	async get({
		token,
	}: GetInvestorAuthRequestModel): Promise<GetInvestorAuthResponseModel> {
		try {
			const investorID = this.authProvider.getPayload(token) as string;
			await this.investorDataGateway.getByID(investorID);
			return {
				investorID,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
