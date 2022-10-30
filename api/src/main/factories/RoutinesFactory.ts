import { AssetRoutinesFactory } from "../../modules/asset/factory/AssetRoutinesFactory";
import { DataGatewayFactory } from "./DataGatewayFactory";
import { ProviderFactory } from "./ProviderFactory";

export class RoutinesFactory {
	public readonly assetRoutines: AssetRoutinesFactory;
	constructor(
		private readonly dataGatewayFactory: DataGatewayFactory,
		private readonly providerFactory: ProviderFactory,
	) {
		this.assetRoutines = new AssetRoutinesFactory(
			dataGatewayFactory.assetDataGateway,
			providerFactory.assetQuoteProvider,
		);
	}
}
