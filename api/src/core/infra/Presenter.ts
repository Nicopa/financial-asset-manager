import { BaseError } from "../base/error";

export interface Presenter<ResponseModel> {
	setSuccessResponse(responseModel?: ResponseModel): void;
	setFailureResponse(error: BaseError): void;
}
