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
	GetInvestorRequestModel,
	GetInvestorResponseModel,
} from "./GetInvestor";

export class GetInvestorHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<
			GetInvestorRequestModel,
			GetInvestorResponseModel
		>,
		private readonly presenter: HTTPPresenter<GetInvestorResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): GetInvestorRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		return {
			id: request.locals.investorID,
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
			else this.presenter.setFailureResponse(new UnexpectedError(error));
			return this.presenter.response;
		}
		if (this.nextController) return this.nextController.handle(request);
		return this.presenter.response;
	}
}
