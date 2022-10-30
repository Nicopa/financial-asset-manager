import { Entity } from "../../../../core/domain";
import { UUIDProvider } from "../../../../core/domain/service/uuid";
import { AssetIDType } from "../../../asset/domain/id";
import { Currency } from "../../../money/domain";
import { TradingIDType } from "../../../trading/domain/id";
import { InvalidMoneyValue } from "./error";
import { WalletAssetID, WalletAssetIDType } from "./id";

export interface WalletAssetState {
	assetID: AssetIDType;
	sourceTradingID: TradingIDType;
	quantity: number;
	operationDate: Date;
	currency: Currency;
	acquisitionTotalAmount?: number;
	disposalTotalAmount?: number;
	createdAt: Date;
}
export type WalletAssetLoadParams = {
	id: WalletAssetIDType;
	assetID: AssetIDType;
	sourceTradingID: TradingIDType;
	quantity: number;
	operationDate: Date;
	currency: Currency;
	acquisitionTotalAmount?: number;
	disposalTotalAmount?: number;
	createdAt: Date;
};
export type WalletAssetCreateParams = Omit<
	WalletAssetLoadParams,
	"id" | "createdAt"
>;
export class WalletAsset extends Entity<WalletAssetIDType, WalletAssetState> {
	private static validateOperation(
		acquisitionTotalAmount?: number,
		disposalTotalAmount?: number,
	) {
		if (
			(acquisitionTotalAmount && disposalTotalAmount) ||
			(!acquisitionTotalAmount && !disposalTotalAmount)
		)
			throw new InvalidMoneyValue();
	}
	public static create(
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
	): WalletAsset {
		WalletAsset.validateOperation(acquisitionTotalAmount, disposalTotalAmount);
		const walletAsset = new WalletAsset(WalletAssetID.create(uUIDProvider), {
			assetID,
			sourceTradingID,
			quantity: acquisitionTotalAmount ? quantity : -quantity,
			operationDate,
			currency,
			acquisitionTotalAmount,
			disposalTotalAmount,
			createdAt: new Date(),
		});
		return walletAsset;
	}
	public static load({
		id,
		assetID,
		sourceTradingID,
		quantity,
		operationDate,
		currency,
		acquisitionTotalAmount,
		disposalTotalAmount,
		createdAt,
	}: WalletAssetLoadParams) {
		return new WalletAsset(WalletAssetID.load(id), {
			assetID,
			sourceTradingID,
			quantity,
			operationDate,
			currency,
			acquisitionTotalAmount,
			disposalTotalAmount,
			createdAt,
		});
	}
}
