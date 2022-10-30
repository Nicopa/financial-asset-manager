import { CreateWithdrawHTTPPresenter } from "../command/create-withdraw";
import { DeleteWithdrawHTTPPresenter } from "../command/delete-withdraw";

export class WithdrawHTTPPresenterFactory {
	public makeCreateWithdrawPresenter() {
		return new CreateWithdrawHTTPPresenter();
	}
	public makeDeleteWithdrawPresenter() {
		return new DeleteWithdrawHTTPPresenter();
	}
}
