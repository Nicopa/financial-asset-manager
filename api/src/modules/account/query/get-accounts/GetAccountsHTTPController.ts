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
	GetAccountsRequestModel,
	GetAccountsResponseModel,
} from "./GetAccounts";

export class GetAccountsHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<
			GetAccountsRequestModel,
			GetAccountsResponseModel
		>,
		private readonly presenter: HTTPPresenter<GetAccountsResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): GetAccountsRequestModel {
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
