import { GetBDRsHTTPPresenter } from "../query/get-brazilian-stocks";

export class BDRHTTPPresenterFactory {
	public makeGetBDRsPresenter() {
		return new GetBDRsHTTPPresenter();
	}
}
