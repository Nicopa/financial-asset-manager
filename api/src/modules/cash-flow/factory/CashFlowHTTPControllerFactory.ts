import { CashFlowDataGateway } from "../data-gateway";
import {
	GetCashFlows,
	GetCashFlowsHTTPController,
} from "../query/get-cash-flows";
import { CashFlowHTTPPresenterFactory } from "./CashFlowHTTPPresenterFactory";

export class CashFlowHTTPControllerFactory {
	private readonly httpPresenterFactory = new CashFlowHTTPPresenterFactory();
	constructor(private readonly dataGateway: CashFlowDataGateway) {}
	public makeGetCashFlowsController() {
		return new GetCashFlowsHTTPController(
			new GetCashFlows(this.dataGateway),
			this.httpPresenterFactory.makeGetCashFlowsPresenter(),
		);
	}
}
