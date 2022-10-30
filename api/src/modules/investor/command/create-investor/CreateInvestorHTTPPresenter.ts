import { BaseError, ClientError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { CreateInvestorResponseModel } from "./CreateInvestor";

export class CreateInvestorHTTPPresenter extends HTTPPresenter<CreateInvestorResponseModel> {
	setSuccessResponse() {
		this._response = this.created();
	}
	setFailureResponse(error: BaseError) {
		if (error instanceof ClientError) this._response = this.badRequest(error);
		else this._response = this.serverError(error.message);
	}
}
