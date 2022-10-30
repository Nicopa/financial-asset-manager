import { CreateTradingHTTPPresenter } from "../command/create-trading";
import { DeleteTradingHTTPPresenter } from "../command/delete-trading";
import { GetTradingsHTTPPresenter } from "../query/get-tradings";

export class TradingHTTPPresenterFactory {
	public makeCreateTradingPresenter() {
		return new CreateTradingHTTPPresenter();
	}
	public makeGetTradingsPresenter() {
		return new GetTradingsHTTPPresenter();
	}
	public makeDeleteTradingPresenter() {
		return new DeleteTradingHTTPPresenter();
	}
}
