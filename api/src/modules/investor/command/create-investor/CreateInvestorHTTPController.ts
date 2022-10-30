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
	CreateInvestorRequestModel,
	CreateInvestorResponseModel,
} from "./CreateInvestor";

export class CreateInvestorHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			CreateInvestorRequestModel,
			CreateInvestorResponseModel
		>,
		private readonly presenter: HTTPPresenter<CreateInvestorResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): CreateInvestorRequestModel {
		if (!request.body)
			throw new EmptyBody([
				"username",
				"fullname",
				"password",
				"cpf (optional)",
			]);
		if (request.body.username === undefined) throw new MissingField("username");
		if (!request.body.fullname === undefined)
			throw new MissingField("fullname");
		if (!request.body.password === undefined)
			throw new MissingField("password");
		return {
			username: request.body.username,
			fullname: request.body.fullname,
			password: request.body.password,
			cpf: request.body.cpf,
		};
	}
	async handle(request: HTTPRequest): Promise<HTTPResponse> {
		try {
			const requestModel = this.getRequestModel(request);
			await this.command.execute(requestModel);
			this.presenter.setSuccessResponse();
		} catch (error) {
			if (error instanceof ClientError)
				this.presenter.setFailureResponse(error);
			else this.presenter.setFailureResponse(new UnexpectedError(error));
			return this.presenter.response;
		}
		if (this.nextController) return this.nextController.handle(request);
		return this.presenter.response;
	}
}
