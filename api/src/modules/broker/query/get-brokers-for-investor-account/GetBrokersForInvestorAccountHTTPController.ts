import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { MissingField } from "../../../../core/infra/http/error";
import {
	GetBrokersForInvestorAccountRequestModel,
	GetBrokersForInvestorAccountResponseModel,
} from "./GetBrokersForInvestorAccount";

export class GetBrokersForInvestorAccountHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<
			GetBrokersForInvestorAccountRequestModel,
			GetBrokersForInvestorAccountResponseModel
		>,
		private readonly presenter: HTTPPresenter<GetBrokersForInvestorAccountResponseModel>,
	) {
		super();
	}
	private getRequestModel(
		request: HTTPRequest,
	): GetBrokersForInvestorAccountRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		return {
			investorID: request.locals.investorID,
		};
	}
	async handle(request: HTTPRequest): Promise<HTTPResponse> {
		try {
			const requestModel = this.getRequestModel(request);
			const responseModel = await this.query.get(requestModel);
			this.presenter.setSuccessResponse(responseModel);
		} catch (error) {
			if (error instanceof ClientError)
				this.presenter.setFailureResponse(error);
			else
				this.presenter.setFailureResponse(new UnexpectedError(String(error)));
		}
		if (this.nextController) return this.nextController.handle(request);
		return this.presenter.response;
	}
}
