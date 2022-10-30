import { GetBrazilianStocksHTTPPresenter } from "../query/get-brazilian-stocks";

export class BrazilianStockHTTPPresenterFactory {
	public makeGetBrazilianStocksPresenter() {
		return new GetBrazilianStocksHTTPPresenter();
	}
}
