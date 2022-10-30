import { BaseError, ClientError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { GetInvestorResponseModel } from "./GetInvestor";

export class GetInvestorHTTPPresenter extends HTTPPresenter<GetInvestorResponseModel> {
	setSuccessResponse(
		responseModel?: GetInvestorResponseModel | undefined,
	): void {
		this._response = this.ok(responseModel);
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof ClientError) this._response = this.badRequest(error);
		else this._response = this.serverError(error.message);
	}
}
