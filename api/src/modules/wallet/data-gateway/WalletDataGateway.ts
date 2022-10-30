import { AssetNameValue } from "../../asset/domain/asset-name/AssetName";
import { AssetTypeValue } from "../../asset/domain/asset-type/AssetType";
import { AssetIDType } from "../../asset/domain/id";
import { InvestorIDType } from "../../investor/domain/id";
import { WalletIDType } from "../domain/id";

export type WalletAssetDataMap = {
	id: WalletIDType;
	assetID: AssetIDType;
	assetName: AssetNameValue;
	type: AssetTypeValue;
	currency: string;
	lastPrice: number;
	quantity: number;
	operationDate: Date;
	acquisitionTotalAmount?: number;
	disposalTotalAmount?: number;
};
export type WalletDataMap = {
	id: InvestorIDType;
	assets: WalletAssetDataMap[];
	// updatedAt: Date;
};
export interface WalletDataGateway {
	getByID(id: WalletIDType): Promise<WalletDataMap>;
	getWalletList(): Promise<Omit<WalletDataMap, "assets">[]>;
}
