import { BaseError, ClientError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { CreateWithdrawResponseModel } from "./CreateWithdraw";

export class CreateWithdrawHTTPPresenter extends HTTPPresenter<CreateWithdrawResponseModel> {
	setSuccessResponse(): void {
		this._response = this.created();
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof ClientError) this._response = this.badRequest(error);
		else this._response = this.serverError(error.message);
	}
}
