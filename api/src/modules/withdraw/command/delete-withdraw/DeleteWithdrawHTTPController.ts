import { Command } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { MissingParam } from "../../../../core/infra/http/error";
import {
	DeleteWithdrawRequestModel,
	DeleteWithdrawResponseModel,
} from "./DeleteWithdraw";

export class DeleteWithdrawHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			DeleteWithdrawRequestModel,
			DeleteWithdrawResponseModel
		>,
		private readonly presenter: HTTPPresenter<DeleteWithdrawResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): DeleteWithdrawRequestModel {
		if (!request.params.id) throw new MissingParam("id");
		return {
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
