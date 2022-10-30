import { BaseError } from "../../base/error";
import { Presenter } from "../Presenter";
import { HTTPResponse } from "./HTTPResponse";

export abstract class HTTPPresenter<ResponseModel>
	implements Presenter<ResponseModel>
{
	abstract setSuccessResponse(responseModel?: ResponseModel): void;
	abstract setFailureResponse(error: BaseError): void;
	protected _response: HTTPResponse | undefined = undefined;
	get response(): HTTPResponse {
		if (!this._response) return this.noContent();
		return this._response;
	}
	protected ok(body?: any): HTTPResponse {
		return {
			statusCode: 200,
			body,
		};
	}
	protected created(body?: any): HTTPResponse {
		return {
			statusCode: 201,
			body,
		};
	}
	protected noContent(): HTTPResponse {
		return {
			statusCode: 204,
		};
	}
	protected badRequest(body: any): HTTPResponse {
		return {
			statusCode: 400,
			body,
		};
	}
	protected unauthorized(body?: any): HTTPResponse {
		return {
			statusCode: 401,
			body: body,
		};
	}
	protected forbidden(body: any): HTTPResponse {
		return {
			statusCode: 403,
			body,
		};
	}
	protected serverError(body?: any): HTTPResponse {
		return {
			statusCode: 500,
			body,
		};
	}
}
