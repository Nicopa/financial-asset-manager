import { UUIDProviderMock } from "../../../../core/domain/service/uuid/__mocks__/UUIDMock";
import { WalletAsset, WalletAssetCreateParams } from "./WalletAsset";

describe("[wallet] Wallet Asset", () => {
	const acquisition1: WalletAssetCreateParams = {
		assetID: "assetid",
		sourceTradingID: "trading1",
		quantity: 2,
		currency: "USD",
		operationDate: new Date(),
		acquisitionTotalAmount: 1000,
	};
	const disposal1: WalletAssetCreateParams = {
		assetID: "assetid",
		sourceTradingID: "trading2",
		quantity: 1,
		currency: "USD",
		operationDate: new Date(),
		disposalTotalAmount: 500,
	};
	const uUIDProviderMock = new UUIDProviderMock();
	test("It should return a wallet asset object if created with valid data.", () => {
		expect(WalletAsset.create(acquisition1, uUIDProviderMock)).toBeInstanceOf(
			WalletAsset,
		);
	});
});
