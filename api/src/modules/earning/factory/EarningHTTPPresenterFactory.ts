import { CreateEarningHTTPPresenter } from "../command/create-earning";
import { DeleteEarningHTTPPresenter } from "../command/delete-earning";
import { GetEarningsHTTPPresenter } from "../query/get-earnings";

export class EarningHTTPPresenterFactory {
	public makeCreateEarningPresenter() {
		return new CreateEarningHTTPPresenter();
	}
	public makeGetEarningsPresenter() {
		return new GetEarningsHTTPPresenter();
	}
	public makeDeleteEarningPresenter() {
		return new DeleteEarningHTTPPresenter();
	}
}
