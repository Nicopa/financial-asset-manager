import { ETFDataGateway } from "../data-gateway";
import { GetETFs, GetETFsHTTPController } from "../query/get-etfs";
import { ETFHTTPPresenterFactory } from "./ETFHTTPPresenter";

export class ETFHTTPControllerFactory {
	private readonly httpPresenterFactory = new ETFHTTPPresenterFactory();
	constructor(private readonly dataGateway: ETFDataGateway) {}
	public makeGetETFsController() {
		return new GetETFsHTTPController(
			new GetETFs(this.dataGateway),
			this.httpPresenterFactory.makeGetETFsPresenter(),
		);
	}
}
