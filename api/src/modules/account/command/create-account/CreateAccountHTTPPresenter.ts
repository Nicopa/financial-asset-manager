import { BaseError, UnexpectedError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { CreateAccountResponseModel } from "./CreateAccount";

export class CreateAccountHTTPPresenter extends HTTPPresenter<CreateAccountResponseModel> {
	setSuccessResponse(responseModel?: CreateAccountResponseModel): void {
		this._response = this.created();
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof UnexpectedError)
			this._response = this.serverError(error);
		else this._response = this.badRequest(error);
	}
}
