import { ID } from "../../../../../core/domain";
import { UUIDProvider } from "../../../../../core/domain/service/uuid";

export type WalletAssetIDType = string;
export class WalletAssetID extends ID<WalletAssetIDType> {
	static create(uUIDProvider: UUIDProvider) {
		return new WalletAssetID(uUIDProvider.generate());
	}
	static load(value: WalletAssetIDType) {
		return new WalletAssetID(value);
	}
}
