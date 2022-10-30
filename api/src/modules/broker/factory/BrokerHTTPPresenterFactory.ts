import { GetBrokersForInvestorAccountHTTPPresenter } from "../query/get-brokers-for-investor-account";

export class BrokerHTTPPresenterFactory {
	public makeGetBrokersForInvestorAccountPresenter() {
		return new GetBrokersForInvestorAccountHTTPPresenter();
	}
}
