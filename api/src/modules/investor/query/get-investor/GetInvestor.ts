import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import { InvestorDataGateway } from "../../data-gateway";
import { CPFValue } from "../../domain/CPF";
import { FullnameValue } from "../../domain/fullname";
import { InvestorIDType } from "../../domain/id";
import { UsernameValue } from "../../domain/username";

export type GetInvestorRequestModel = {
	id: InvestorIDType;
};
export type GetInvestorResponseModel = {
	username: UsernameValue;
	fullname: FullnameValue;
	cpf?: CPFValue;
};
export class GetInvestor
	implements Query<GetInvestorRequestModel, GetInvestorResponseModel>
{
	constructor(private readonly investorDataGateway: InvestorDataGateway) {}
	async get({
		id,
	}: GetInvestorRequestModel): Promise<GetInvestorResponseModel> {
		try {
			const data = await this.investorDataGateway.getByID(id);
			return {
				username: data.username,
				fullname: data.fullname,
				cpf: data.cpf,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else throw new UnexpectedError(String(error));
		}
	}
}
