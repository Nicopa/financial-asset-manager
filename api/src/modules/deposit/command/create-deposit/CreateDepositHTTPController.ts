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
	CreateDepositRequestModel,
	CreateDepositResponseModel,
} from "./CreateDeposit";

export class CreateDepositHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			CreateDepositRequestModel,
			CreateDepositResponseModel
		>,
		private readonly presenter: HTTPPresenter<CreateDepositResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): CreateDepositRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		if (!request.body)
			throw new EmptyBody(["brokerID", "amount", "currency", "date"]);
		if (!request.body.brokerID) throw new MissingField("brokerID");
		if (!request.body.value) throw new MissingField("value");
		if (!request.body.value.amount) throw new MissingField("amount");
		if (!request.body.value.currency) throw new MissingField("currency");
		if (!request.body.date) throw new MissingField("date");
		return {
			accountID: {
				investorID: request.locals.investorID,
				brokerID: request.body.brokerID,
			},
			value: {
				amount: Number(request.body.value.amount),
				currency: request.body.value.currency,
			},
			date: new Date(request.body.date),
			note: request.body.note,
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
