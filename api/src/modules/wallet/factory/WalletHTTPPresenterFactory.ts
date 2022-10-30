import { GetWalletHTTPPresenter } from "../query/get-wallet";
import { GetWalletPieDataHTTPPresenter } from "../query/get-wallet-pie-data";

export class WalletHTTPPresenterFactory {
	public makeGetWalletPresenter() {
		return new GetWalletHTTPPresenter();
	}
	public makeGetWalletPieDataPresenter() {
		return new GetWalletPieDataHTTPPresenter();
	}
}
