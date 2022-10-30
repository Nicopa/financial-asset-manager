import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { GetETFsResponseModel } from "./GetETFs";

export class GetETFsHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<undefined, GetETFsResponseModel>,
		private readonly presenter: HTTPPresenter<GetETFsResponseModel>,
	) {
		super();
	}
	async handle(request: HTTPRequest): Promise<HTTPResponse> {
		try {
			const responseModel = await this.query.get();
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
