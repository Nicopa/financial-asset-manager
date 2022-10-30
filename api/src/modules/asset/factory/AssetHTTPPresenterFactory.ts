import { GetAssetsByNameHTTPPresenter } from "../query/get-assets-by-name";
import { GetAssetsHTTPPresenter } from "../query/get-assets/GetAssetsHTTPPresenter";

export class AssetHTTPPresenterFactory {
	public makeGetAssetsPresenter() {
		return new GetAssetsHTTPPresenter();
	}
	public makeGetAssetsByNamePresenter() {
		return new GetAssetsByNameHTTPPresenter();
	}
}
