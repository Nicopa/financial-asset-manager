import { CreateDepositHTTPPresenter } from "../command/create-deposit";
import { DeleteDepositHTTPPresenter } from "../command/delete-deposit";

export class DepositHTTPPresenterFactory {
	public makeCreateDepositPresenter() {
		return new CreateDepositHTTPPresenter();
	}
	public makeDeleteDepositPresenter() {
		return new DeleteDepositHTTPPresenter();
	}
}
