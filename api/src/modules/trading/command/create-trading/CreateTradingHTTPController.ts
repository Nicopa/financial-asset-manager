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
	CreateTradingRequestModel,
	CreateTradingResponseModel,
} from "./CreateTrading";

export class CreateTradingHTTPController extends HTTPController {
	constructor(
		private readonly command: Command<
			CreateTradingRequestModel,
			CreateTradingResponseModel
		>,
		private readonly presenter: HTTPPresenter<CreateTradingResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): CreateTradingRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		if (!request.body)
			throw new EmptyBody([
				"brokerID",
				"assetID",
				"operation",
				"operationDate",
				"settlementDate",
				"quantity",
				"grossTotal",
				"fee",
				"brokerageFee",
			]);
		if (!request.body.brokerID) throw new MissingField("brokerID");
		if (!request.body.assetID) throw new MissingField("assetID");
		if (!request.body.operation) throw new MissingField("operation");
		if (!request.body.operationDate) throw new MissingField("operationDate");
		if (!request.body.settlementDate) throw new MissingField("settlementDate");
		if (!request.body.quantity) throw new MissingField("quantity");
		if (!request.body.grossTotal) throw new MissingField("grossTotal");
		if (!request.body.grossTotal.amount)
			throw new MissingField("grossTotal.amount");
		if (!request.body.grossTotal.currency)
			throw new MissingField("grossTotal.currency");

		return {
			accountID: {
				investorID: request.locals.investorID,
				brokerID: request.body.brokerID,
			},
			assetID: request.body.assetID,
			operation: request.body.operation,
			operationDate: new Date(request.body.operationDate),
			settlementDate: new Date(request.body.settlementDate),
			quantity: request.body.quantity,
			grossTotal: {
				amount: request.body.grossTotal.amount,
				currency: request.body.grossTotal.currency,
			},
			fee: request.body.fee
				? {
						amount: request.body.fee.amount,
						currency: request.body.fee.currency,
				  }
				: undefined,
			brokerageFee: request.body.brokerageFee
				? {
						amount: request.body.brokerageFee.amount,
						currency: request.body.brokerageFee.currency,
				  }
				: undefined,
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
