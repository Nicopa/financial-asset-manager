import { UUIDProviderMock } from "../../../core/domain/service/uuid/__mocks__/UUIDMock";
import { Wallet, WalletCreateParams } from "./Wallet";

describe("[wallet] Wallet", () => {
	const validWalletCreateParams: WalletCreateParams = {
		id: "investorid",
	};
	const uUIDProviderMock = new UUIDProviderMock();
	test("It should return a wallet asset object if created with valid data.", () => {
		expect(Wallet.create(validWalletCreateParams)).toBeInstanceOf(Wallet);
	});
	test("It should add a new asset to the wallet.", () => {
		const wallet = Wallet.create(validWalletCreateParams);
		expect(wallet.state.assets).toHaveLength(0);
		wallet.add(
			{
				assetID: "assetid1",
				sourceTradingID: "trading1",
				quantity: 10,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 100,
			},
			uUIDProviderMock,
		);
		expect(wallet.state.assets).toHaveLength(1);
		expect(wallet.state.assets[0].state.assetID).toBe("assetid1");
		wallet.add(
			{
				assetID: "assetid2",
				sourceTradingID: "trading2",
				quantity: 10,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 100,
			},
			uUIDProviderMock,
		);
		expect(wallet.state.assets).toHaveLength(2);
		expect(wallet.state.assets[1].state.assetID).toBe("assetid2");
	});
	test("It should delete an asset after adding in the wallet if the asset quantity is zero.", () => {
		const wallet = Wallet.create(validWalletCreateParams);
		expect(wallet.state.assets).toHaveLength(0);
		wallet.add(
			{
				assetID: "assetid1",
				sourceTradingID: "trading1",
				quantity: 10,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 100,
			},
			uUIDProviderMock,
		);
		expect(wallet.state.assets).toHaveLength(1);
		wallet.add(
			{
				assetID: "assetid1",
				sourceTradingID: "trading2",
				quantity: 10,
				operationDate: new Date(),
				currency: "BRL",
				disposalTotalAmount: 200,
			},
			uUIDProviderMock,
		);
		expect(wallet.state.assets).toHaveLength(0);
	});
	test("It should delete an asset.", () => {
		const wallet = Wallet.create(validWalletCreateParams);
		expect(wallet.state.assets).toHaveLength(0);
		wallet.add(
			{
				assetID: "assetid1",
				sourceTradingID: "trading1",
				quantity: 10,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 100,
			},
			uUIDProviderMock,
		);
		expect(wallet.state.assets).toHaveLength(1);
		wallet.delete("trading1");
		expect(wallet.state.assets).toHaveLength(0);
	});
});
