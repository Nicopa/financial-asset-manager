import { GetCashFlowsHTTPPresenter } from "../query/get-cash-flows";

export class CashFlowHTTPPresenterFactory {
	public makeGetCashFlowsPresenter() {
		return new GetCashFlowsHTTPPresenter();
	}
}
