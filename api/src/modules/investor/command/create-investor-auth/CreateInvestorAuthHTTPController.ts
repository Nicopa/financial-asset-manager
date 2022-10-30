import { Command } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { EmptyBody, MissingField } from "../../../../core/infra/http/error";
import {
	CreateInvestorAuthRequestModel,
	CreateInvestorAuthResponseModel,
} from "./CreateInvestorAuth";

export class CreateInvestorAuthHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			CreateInvestorAuthRequestModel,
			CreateInvestorAuthResponseModel
		>,
		private readonly presenter: HTTPPresenter<CreateInvestorAuthResponseModel>,
	) {
		super();
	}
	private getRequestModel(
		request: HTTPRequest,
	): CreateInvestorAuthRequestModel {
		if (!request.body) throw new EmptyBody(["username", "password"]);
		if (!request.body.username) throw new MissingField("username");
		if (!request.body.password) throw new MissingField("password");
		return {
			username: request.body.username,
			password: request.body.password,
		};
	}
	async handle(request: HTTPRequest): Promise<HTTPResponse> {
		try {
			const requestModel = this.getRequestModel(request);
			const responseModel = await this.command.execute(requestModel);
			this.presenter.setSuccessResponse(responseModel);
		} catch (error) {
			if (error instanceof ClientError)
				this.presenter.setFailureResponse(error);
			else
				this.presenter.setFailureResponse(new UnexpectedError(String(error)));
			return this.presenter.response;
		}
		if (this.nextController) return this.nextController.handle(request);
		return this.presenter.response;
	}
}
