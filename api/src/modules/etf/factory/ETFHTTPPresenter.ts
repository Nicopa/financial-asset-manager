import { GetETFsHTTPPresenter } from "../query/get-etfs";

export class ETFHTTPPresenterFactory {
	public makeGetETFsPresenter() {
		return new GetETFsHTTPPresenter();
	}
}
