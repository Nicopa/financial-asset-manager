import { BaseError, UnexpectedError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { GetBrazilianStocksResponseModel } from "./GetBrazilianStocks";

export class GetBrazilianStocksHTTPPresenter extends HTTPPresenter<GetBrazilianStocksResponseModel> {
	setSuccessResponse(
		responseModel?: GetBrazilianStocksResponseModel | undefined,
	): void {
		this._response = this.ok(responseModel);
	}
	setFailureResponse(error: BaseError): void {
		if (error instanceof UnexpectedError)
			this._response = this.serverError(error);
		else this._response = this.badRequest(error);
	}
}
