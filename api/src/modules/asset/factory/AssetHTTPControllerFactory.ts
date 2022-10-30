import { AssetDataGateway } from "../data-gateway";
import { GetAssets, GetAssetsHTTPController } from "../query/get-assets";
import {
	GetAssetsByName,
	GetAssetsByNameHTTPController,
} from "../query/get-assets-by-name";
import { AssetHTTPPresenterFactory } from "./AssetHTTPPresenterFactory";

export class AssetHTTPControllerFactory {
	private readonly httpPresenterFactory = new AssetHTTPPresenterFactory();
	constructor(private readonly dataGateway: AssetDataGateway) {}
	public makeGetAssetsController() {
		return new GetAssetsHTTPController(
			new GetAssets(this.dataGateway),
			this.httpPresenterFactory.makeGetAssetsPresenter(),
		);
	}
	public makeGetAssetsByNameController() {
		return new GetAssetsByNameHTTPController(
			new GetAssetsByName(this.dataGateway),
			this.httpPresenterFactory.makeGetAssetsByNamePresenter(),
		);
	}
}
