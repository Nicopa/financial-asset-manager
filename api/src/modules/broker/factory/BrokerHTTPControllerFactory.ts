import { BrokerDataGateway } from "../data-gateway";
import {
	GetBrokersForInvestorAccount,
	GetBrokersForInvestorAccountHTTPController,
} from "../query/get-brokers-for-investor-account";
import { BrokerHTTPPresenterFactory } from "./BrokerHTTPPresenterFactory";

export class BrokerHTTPControllerFactory {
	private readonly httpPresenterFactory = new BrokerHTTPPresenterFactory();
	constructor(private readonly dataGateway: BrokerDataGateway) {}
	public makeGetBrokersForInvestorAccountController() {
		return new GetBrokersForInvestorAccountHTTPController(
			new GetBrokersForInvestorAccount(this.dataGateway),
			this.httpPresenterFactory.makeGetBrokersForInvestorAccountPresenter(),
		);
	}
}
