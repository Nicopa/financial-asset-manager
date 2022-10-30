import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { EmptyHeader, MissingField } from "../../../../core/infra/http/error";
import {
	GetInvestorAuthRequestModel,
	GetInvestorAuthResponseModel,
} from "./GetInvestorAuth";

export class GetInvestorAuthHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<
			GetInvestorAuthRequestModel,
			GetInvestorAuthResponseModel
		>,
		private readonly presenter: HTTPPresenter<GetInvestorAuthResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): GetInvestorAuthRequestModel {
		if (!request.headers) throw new EmptyHeader(["authorization"]);
		if (!request.headers.authorization) throw new MissingField("authorization");
		return {
			token: request.headers.authorization,
		};
	}
	async handle(request: HTTPRequest): Promise<HTTPResponse> {
		try {
			const requestModel = this.getRequestModel(request);
			const responseModel = await this.query.get(requestModel);
			request.locals = {
				...request.locals,
				investorID: responseModel.investorID,
			};
		} catch (error) {
			if (error instanceof ClientError)
				this.presenter.setFailureResponse(error);
			else
				this.presenter.setFailureResponse(new UnexpectedError(String(error)));
			return this.presenter.response;
		}
		if (this.nextController) return this.nextController.handle(request);
		return this.presenter.response;
	}
}
