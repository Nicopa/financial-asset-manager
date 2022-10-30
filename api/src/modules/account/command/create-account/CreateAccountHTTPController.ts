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
	CreateAccountRequestModel,
	CreateAccountResponseModel,
} from "./CreateAccount";

export class CreateAccountHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			CreateAccountRequestModel,
			CreateAccountResponseModel
		>,
		private readonly presenter: HTTPPresenter<CreateAccountResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): CreateAccountRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		if (!request.body) throw new EmptyBody(["brokerID"]);
		if (!request.body.brokerID) throw new MissingField("brokerID");
		return {
			investorID: request.locals.investorID,
			brokerID: request.body.brokerID,
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
