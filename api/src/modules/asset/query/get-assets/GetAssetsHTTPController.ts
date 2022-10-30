import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { GetAssetsRequestModel, GetAssetsResponseModel } from "./GetAssets";

export class GetAssetsHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<
			GetAssetsRequestModel,
			GetAssetsResponseModel
		>,
		private readonly presenter: HTTPPresenter<GetAssetsResponseModel>,
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
