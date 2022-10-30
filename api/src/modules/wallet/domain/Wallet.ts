import { AggregateRoot } from "../../../core/domain";
import { InvestorIDType } from "../../investor/domain/id";
import { WalletAsset, WalletAssetCreateParams } from "./wallet-asset";
import { WalletID, WalletIDType } from "./id";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { WalletAssetIDType } from "./wallet-asset/id";
import { WalletAssetIDNotFound } from "./error";
import { TradingIDType } from "../../trading/domain/id";

export interface WalletState {
	assets: WalletAsset[];
}
export type WalletLoadParams = {
	id: InvestorIDType;
	assets: WalletAsset[];
};
export type WalletCreateParams = Omit<WalletLoadParams, "assets">;
export class Wallet extends AggregateRoot<WalletIDType, WalletState> {
	public add(
		{
			assetID,
			sourceTradingID,
			quantity,
			operationDate,
			currency,
			acquisitionTotalAmount,
			disposalTotalAmount,
		}: WalletAssetCreateParams,
		uUIDProvider: UUIDProvider,
	) {
		this.state.assets.push(
			WalletAsset.create(
				{
					assetID,
					sourceTradingID,
					quantity,
					operationDate,
					currency,
					acquisitionTotalAmount,
					disposalTotalAmount,
				},
				uUIDProvider,
			),
		);
		const total = this.state.assets.reduce((previousValue, walletAsset) => {
			if (walletAsset.state.assetID === assetID)
				return previousValue + walletAsset.state.quantity;
			return previousValue;
		}, 0);
		if (!total)
			this.state.assets = this.state.assets.filter(
				(asset) => asset.state.assetID !== assetID,
			);
	}
	public delete(id: TradingIDType) {
		const walletAsset = this.state.assets.find(
			(asset) => asset.state.sourceTradingID === id,
		);
		if (!walletAsset) throw new WalletAssetIDNotFound();
		this.state.assets = this.state.assets.filter(
			(asset) => asset !== walletAsset,
		);
	}
	public static create({ id }: WalletCreateParams): Wallet {
		const wallet = new Wallet(WalletID.create(id), {
			assets: [],
		});
		return wallet;
	}
	public static load(params: WalletLoadParams) {
		return new Wallet(WalletID.load(params.id), {
			assets: params.assets,
		});
	}
}
