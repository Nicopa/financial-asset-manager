import { BaseError, ClientError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { DeleteDepositResponseModel } from "./DeleteDeposit";

export class DeleteDepositHTTPPresenter extends HTTPPresenter<DeleteDepositResponseModel> {
	setSuccessResponse(): void {
		this._response = this.noContent();
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof ClientError) this._response = this.badRequest(error);
		else this._response = this.serverError(error.message);
	}
}
