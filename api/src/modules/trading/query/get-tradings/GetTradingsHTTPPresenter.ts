import { BaseError, UnexpectedError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { GetTradingsResponseModel } from "./GetTradings";

export class GetTradingsHTTPPresenter extends HTTPPresenter<GetTradingsResponseModel> {
	setSuccessResponse(responseModel?: GetTradingsResponseModel): void {
		this._response = this.ok(responseModel);
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof UnexpectedError)
			this._response = this.serverError(error);
		else this._response = this.badRequest(error);
	}
}
