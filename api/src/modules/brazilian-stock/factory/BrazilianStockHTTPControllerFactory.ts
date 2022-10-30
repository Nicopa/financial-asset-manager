import { BrazilianStockDataGateway } from "../data-gateway";
import {
	GetBrazilianStocks,
	GetBrazilianStocksHTTPController,
} from "../query/get-brazilian-stocks";
import { BrazilianStockHTTPPresenterFactory } from "./BrazilianStockHTTPPresenter";

export class BrazilianStockHTTPControllerFactory {
	private readonly httpPresenterFactory =
		new BrazilianStockHTTPPresenterFactory();
	constructor(private readonly dataGateway: BrazilianStockDataGateway) {}
	public makeGetBrazilianStocksController() {
		return new GetBrazilianStocksHTTPController(
			new GetBrazilianStocks(this.dataGateway),
			this.httpPresenterFactory.makeGetBrazilianStocksPresenter(),
		);
	}
}
