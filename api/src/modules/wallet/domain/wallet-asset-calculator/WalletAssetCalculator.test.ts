import { AssetTypeValue } from "../../../asset/domain/asset-type/AssetType";
import { AssetIDType } from "../../../asset/domain/id";
import { Currency } from "../../../money/domain";
import { WalletAsset, WalletAssetLoadParams } from "../wallet-asset";
import {
	PooledWalletAsset,
	WalletAssetCalculator,
} from "./WalletAssetCalculator";

describe("[wallet] Wallet Asset Calculator", () => {
	const validWalletAssetCreateParams: WalletAssetLoadParams = {
		id: "walletassetid",
		assetID: "assetid1",
		sourceTradingID: "trading1",
		quantity: 2,
		operationDate: new Date(),
		currency: "USD",
		acquisitionTotalAmount: 1000,
		createdAt: new Date(),
	};
	test("It should calculate average unit cost.", () => {
		expect(
			WalletAssetCalculator.getAvgUnitCost(
				validWalletAssetCreateParams.acquisitionTotalAmount!,
				validWalletAssetCreateParams.quantity,
			),
		).toBe(500);
	});
	test("It should calculate total return for a given income tax and a disposal value.", () => {
		expect(
			WalletAssetCalculator.getTotalExpectedReturn(
				validWalletAssetCreateParams.acquisitionTotalAmount!,
				2000,
				0.15,
			),
		).toBe(850);
		expect(
			WalletAssetCalculator.getTotalExpectedReturn(
				validWalletAssetCreateParams.acquisitionTotalAmount!,
				500,
				0.15,
			),
		).toBe(-500);
	});
	test("It should calculate return ratio for a given income tax and a disposal value.", () => {
		expect(
			WalletAssetCalculator.getReturnRatio(
				validWalletAssetCreateParams.acquisitionTotalAmount!,
				2000,
				0.15,
			),
		).toBe(0.85);
		expect(
			WalletAssetCalculator.getReturnRatio(
				validWalletAssetCreateParams.acquisitionTotalAmount!,
				500,
				0.15,
			),
		).toBe(-0.5);
	});
	test("It should calculate acquisition total, acquisition unit cost, disposal total, disposal unit cost, total expected return and return ratio.", () => {
		const pooledWalletAsset: PooledWalletAsset & {
			assetID: AssetIDType;
			assetType: AssetTypeValue;
			currency: Currency;
			lastPrice: number;
		} = {
			assetName: "Asset name",
			quantity: 0,
			tradings: [
				{
					quantity: validWalletAssetCreateParams.quantity,
					operationDate: new Date(),
					acquisitionTotal: {
						amount: validWalletAssetCreateParams.acquisitionTotalAmount!,
						currency: validWalletAssetCreateParams.currency,
					},
					acquisitionUnitCost: {
						amount:
							validWalletAssetCreateParams.acquisitionTotalAmount! /
							validWalletAssetCreateParams.quantity,
						currency: validWalletAssetCreateParams.currency,
					},
					disposalUnitCost: {
						amount: 550,
						currency: validWalletAssetCreateParams.currency,
					},
					disposalTotal: {
						amount: 1100,
						currency: validWalletAssetCreateParams.currency,
					},
					totalExpectedReturn: {
						amount: 100,
						currency: validWalletAssetCreateParams.currency,
					},
					totalExpectedReturnRatio: 0.1,
				},
				{
					quantity: validWalletAssetCreateParams.quantity,
					operationDate: new Date(),
					acquisitionTotal: {
						amount: validWalletAssetCreateParams.acquisitionTotalAmount!,
						currency: validWalletAssetCreateParams.currency,
					},
					acquisitionUnitCost: {
						amount:
							validWalletAssetCreateParams.acquisitionTotalAmount! /
							validWalletAssetCreateParams.quantity,
						currency: validWalletAssetCreateParams.currency,
					},
					disposalUnitCost: {
						amount: 550,
						currency: validWalletAssetCreateParams.currency,
					},
					disposalTotal: {
						amount: 1100,
						currency: validWalletAssetCreateParams.currency,
					},
					totalExpectedReturn: {
						amount: 100,
						currency: validWalletAssetCreateParams.currency,
					},
					totalExpectedReturnRatio: 0.1,
				},
			],
			assetID: validWalletAssetCreateParams.assetID,
			assetType: "BRAZILIAN_STOCK",
			currency: validWalletAssetCreateParams.currency,
			lastPrice: 550,
			walletValueAmount: 0,
		};
		WalletAssetCalculator.calculatePool(pooledWalletAsset);
		expect(pooledWalletAsset.acquisitionTotal?.amount).toBe(2000);
		expect(pooledWalletAsset.acquisitionUnitCost?.amount).toBe(500);
		expect(pooledWalletAsset.disposalTotal?.amount).toBe(2200);
		expect(pooledWalletAsset.disposalUnitCost?.amount).toBe(550);
		expect(pooledWalletAsset.totalExpectedReturn?.amount).toBe(200);
		expect(pooledWalletAsset.totalExpectedReturnRatio).toBe(0.1);
	});
});
