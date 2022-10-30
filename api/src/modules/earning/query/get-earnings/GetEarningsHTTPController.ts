import { Query } from "../../../../core/application";
import { ClientError, UnexpectedError } from "../../../../core/base/error";
import {
	HTTPController,
	HTTPPresenter,
	HTTPRequest,
	HTTPResponse,
} from "../../../../core/infra/http";
import { MissingField } from "../../../../core/infra/http/error";
import { AssetTypeValue } from "../../../asset/domain/asset-type/AssetType";
import {
	DateComparisonOperator,
	NumberComparisonOperator,
} from "../../../cash-flow/data-gateway";
import { Currency } from "../../../money/domain";
import { EarningTypeValue } from "../../domain/earning-type";
import {
	GetEarningsRequestModel,
	GetEarningsResponseModel,
} from "./GetEarnings";

export class GetEarningsHTTPController extends HTTPController {
	constructor(
		private readonly query: Query<
			GetEarningsRequestModel,
			GetEarningsResponseModel
		>,
		private readonly presenter: HTTPPresenter<GetEarningsResponseModel>,
	) {
		super();
	}
	private getRequestModel(request: HTTPRequest): GetEarningsRequestModel {
		if (!request.locals?.investorID) throw new MissingField("investorID");
		return {
			filters: {
				investorID: request.locals.investorID,
				brokerID: request.query.brokerID
					? (request.query.brokerID as string).split(",")
					: undefined,
				assetName: request.query.assetName
					? (request.query.assetName as string)
					: undefined,
				assetType: request.query.assetType
					? ((request.query.assetType as string).split(",") as AssetTypeValue[])
					: undefined,
				operationDate: request.query.operationDate
					? new Date(request.query.operationDate as string)
					: undefined,
				operationDateComparisonOperator: request.query
					.operationDateComparisonOperator
					? (request.query
							.operationDateComparisonOperator as DateComparisonOperator)
					: undefined,
				settlementDate: request.query.settlementDate
					? new Date(request.query.settlementDate as string)
					: undefined,
				settlementDateComparisonOperator: request.query
					.settlementDateComparisonOperator
					? (request.query
							.settlementDateComparisonOperator as DateComparisonOperator)
					: undefined,
				valueAmount: request.query.valueAmount
					? parseFloat(request.query.valueAmount as string)
					: undefined,
				valueAmountComparisonOperator: request.query
					.valueAmountComparisonOperator
					? (request.query
							.valueAmountComparisonOperator as NumberComparisonOperator)
					: undefined,
				valueCurrency: request.query.valueCurrency
					? ((request.query.valueCurrency as string).split(",") as Currency[])
					: undefined,
				type: request.query.type
					? ((request.query.type as string).split(",") as EarningTypeValue[])
					: undefined,
				quantity: request.query.quantity
					? parseFloat(request.query.quantity as string)
					: undefined,
				quantityComparisonOperator: request.query.quantityComparisonOperator
					? (request.query
							.quantityComparisonOperator as NumberComparisonOperator)
					: undefined,
			},
			limit: request.query.limit
				? parseInt(request.query.limit as string)
				: undefined,
			offset: request.query.offset
				? parseInt(request.query.offset as string)
				: undefined,
		};
	}
	async handle(request: HTTPRequest): Promise<HTTPResponse> {
		try {
			const requestModel = this.getRequestModel(request);
			const responseModel = await this.query.get(requestModel);
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
