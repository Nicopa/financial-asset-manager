import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import {
	GetAssetsByNameRequestModel,
	GetAssetsByNameResponseModel,
} from "./GetAssetsByName";

export class GetAssetsByNameHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<
			GetAssetsByNameRequestModel,
			GetAssetsByNameResponseModel
		>,
		private readonly presenter: HTTPPresenter<GetAssetsByNameResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): GetAssetsByNameRequestModel {
		return {
			name: request.query.name ? (request.query.name as string) : "",
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
