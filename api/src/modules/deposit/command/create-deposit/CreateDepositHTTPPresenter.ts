import { BaseError, ClientError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { CreateDepositResponseModel } from "./CreateDeposit";

export class CreateDepositHTTPPresenter extends HTTPPresenter<CreateDepositResponseModel> {
	setSuccessResponse(): void {
		this._response = this.created();
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof ClientError) this._response = this.badRequest(error);
		else this._response = this.serverError(error.message);
	}
}
