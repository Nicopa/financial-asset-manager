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
	CreateEarningRequestModel,
	CreateEarningResponseModel,
} from "./CreateEarning";

export class CreateEarningHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			CreateEarningRequestModel,
			CreateEarningResponseModel
		>,
		private readonly presenter: HTTPPresenter<CreateEarningResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): CreateEarningRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		if (!request.body)
			throw new EmptyBody(["brokerID", "amount", "currency", "date"]);
		if (!request.body.brokerID) throw new MissingField("brokerID");
		if (!request.body.value) throw new MissingField("value");
		if (!request.body.value.amount) throw new MissingField("amount");
		if (!request.body.value.currency) throw new MissingField("currency");
		if (!request.body.operationDate) throw new MissingField("operationDate");
		if (!request.body.settlementDate) throw new MissingField("settlementDate");
		if (!request.body.assetID) throw new MissingField("assetID");
		if (!request.body.type) throw new MissingField("type");
		if (!request.body.quantity) throw new MissingField("quantity");
		return {
			accountID: {
				investorID: request.locals.investorID,
				brokerID: request.body.brokerID,
			},
			value: {
				amount: Number(request.body.value.amount),
				currency: request.body.value.currency,
			},
			operationDate: new Date(request.body.operationDate),
			settlementDate: new Date(request.body.settlementDate),
			assetID: request.body.assetID,
			type: request.body.type,
			quantity: request.body.quantity,
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
