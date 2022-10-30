import { BaseError, UnexpectedError } from "../../../../core/base/error";
import { HTTPPresenter } from "../../../../core/infra/http";
import { EmptyHeader, MissingField } from "../../../../core/infra/http/error";
import {
	BadFormatted,
	ExpiredToken,
	NoTokenProvided,
	TokenError,
} from "../../../auth/jwt/error";
import { GetInvestorAuthResponseModel } from "./GetInvestorAuth";

export class GetInvestorAuthHTTPPresenter extends HTTPPresenter<GetInvestorAuthResponseModel> {
	setSuccessResponse(responseModel?: GetInvestorAuthResponseModel): void {
		this._response = this.noContent();
	}
	setFailureResponse(error: BaseError): void {
		if (
			error instanceof MissingField ||
			error instanceof EmptyHeader ||
			error instanceof NoTokenProvided ||
			error instanceof TokenError ||
			error instanceof BadFormatted ||
			error instanceof ExpiredToken
		)
			this._response = this.unauthorized(error);
		else if (error instanceof UnexpectedError)
			this._response = this.serverError(error);
		else this._response = this.badRequest(error);
	}
}
