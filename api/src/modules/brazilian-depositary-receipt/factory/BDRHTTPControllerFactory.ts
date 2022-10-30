import { BDRDataGateway } from "../data-gateway";
import { GetBDRs, GetBDRsHTTPController } from "../query/get-brazilian-stocks";
import { BDRHTTPPresenterFactory } from "./BDRHTTPPresenter";

export class BDRHTTPControllerFactory {
	private readonly httpPresenterFactory = new BDRHTTPPresenterFactory();
	constructor(private readonly dataGateway: BDRDataGateway) {}
	public makeGetBDRsController() {
		return new GetBDRsHTTPController(
			new GetBDRs(this.dataGateway),
			this.httpPresenterFactory.makeGetBDRsPresenter(),
		);
	}
}
