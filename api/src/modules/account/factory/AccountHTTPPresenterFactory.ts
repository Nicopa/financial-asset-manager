import { CreateAccountHTTPPresenter } from "../command/create-account";
import { GetAccountsHTTPPresenter } from "../query/get-accounts";

export class AccountHTTPPresenterFactory {
	public makeCreateAccountPresenter() {
		return new CreateAccountHTTPPresenter();
	}
	public makeGetAccountsPresenter() {
		return new GetAccountsHTTPPresenter();
	}
}
