import { BaseError, ClientError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { CreateInvestorAuthResponseModel } from "./CreateInvestorAuth";

export class CreateInvestorAuthHTTPPresenter extends HTTPPresenter<CreateInvestorAuthResponseModel> {
	setSuccessResponse(
		responseModel?: CreateInvestorAuthResponseModel | undefined,
	): void {
		this._response = this.ok(responseModel);
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof ClientError) this._response = this.badRequest(error);
		else this._response = this.serverError(error.message);
	}
}
