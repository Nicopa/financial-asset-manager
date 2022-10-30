import { BaseError, UnexpectedError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { GetAccountsResponseModel } from "./GetAccounts";

export class GetAccountsHTTPPresenter extends HTTPPresenter<GetAccountsResponseModel> {
	setSuccessResponse(
		responseModel?: GetAccountsResponseModel | undefined,
	): void {
		this._response = this.ok(responseModel);
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof UnexpectedError)
			this._response = this.serverError(error);
		else this._response = this.badRequest(error);
	}
}
