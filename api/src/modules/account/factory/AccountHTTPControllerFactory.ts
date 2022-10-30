import { EventBroker } from "../../../core/application/event";
import {
	CreateAccount,
	CreateAccountHTTPController,
} from "../command/create-account";
import { AccountDataGateway } from "../data-gateway";
import { GetAccounts, GetAccountsHTTPController } from "../query/get-accounts";
import { AccountRepository } from "../repository";
import { AccountHTTPPresenterFactory } from "./AccountHTTPPresenterFactory";

export class AccountHTTPControllerFactory {
	private readonly httpPresenterFactory = new AccountHTTPPresenterFactory();
	constructor(
		private readonly repository: AccountRepository,
		private readonly dataGateway: AccountDataGateway,
		private readonly eventBroker: EventBroker,
	) {}
	public makeCreateAccountController() {
		return new CreateAccountHTTPController(
			new CreateAccount(this.repository, this.eventBroker),
			this.httpPresenterFactory.makeCreateAccountPresenter(),
		);
	}
	public makeGetAccountsController() {
		return new GetAccountsHTTPController(
			new GetAccounts(this.dataGateway),
			this.httpPresenterFactory.makeGetAccountsPresenter(),
		);
	}
}
