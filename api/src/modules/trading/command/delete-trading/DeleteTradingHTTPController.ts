import { Command } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { MissingField, MissingParam } from "../../../../core/infra/http/error";
import {
	DeleteTradingRequestModel,
	DeleteTradingResponseModel,
} from "./DeleteTrading";

export class DeleteTradingHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			DeleteTradingRequestModel,
			DeleteTradingResponseModel
		>,
		private readonly presenter: HTTPPresenter<DeleteTradingResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): DeleteTradingRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		if (!request.params.id) throw new MissingParam("id");
		return {
			investorID: request.locals.investorID,
			id: request.params.id,
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
