import { AssetIDType } from "../../asset/domain/id";
import { KnexDatabase } from "../../database/knex";
import { Currency } from "../../money/domain";
import { TradingIDType } from "../../trading/domain/id";
import { Wallet } from "../domain";
import { WalletIDType } from "../domain/id";
import { WalletAsset } from "../domain/wallet-asset";
import { WalletAssetIDType } from "../domain/wallet-asset/id";
import { WalletNotFound } from "./error";
import { WalletRepository } from "./WalletRepository";

type WalletAssetDataMap = {
	id: WalletAssetIDType;
	walletID: WalletIDType;
	sourceTradingID: TradingIDType;
	assetID: AssetIDType;
	quantity: number;
	operationDate: Date;
	currency: string;
	acquisitionTotalAmount?: number;
	disposalTotalAmount?: number;
	createdAt: Date;
};
type WalletDataMap = {
	id: WalletIDType;
	assets: WalletAssetDataMap[];
};
export class WalletKnexRepository
	extends KnexDatabase
	implements WalletRepository
{
	public static readonly walletTableName = "wallets";
	public static readonly walletAssetTableName = "wallet-assets";
	private toPersistence(wallet: Wallet): WalletDataMap {
		return {
			id: wallet.id.value,
			assets: wallet.state.assets.map((walletAsset) => ({
				id: walletAsset.id.value,
				walletID: wallet.id.value,
				assetID: walletAsset.state.assetID,
				sourceTradingID: walletAsset.state.sourceTradingID,
				quantity: walletAsset.state.quantity,
				operationDate: walletAsset.state.operationDate,
				currency: walletAsset.state.currency,
				acquisitionTotalAmount: walletAsset.state.acquisitionTotalAmount,
				disposalTotalAmount: walletAsset.state.disposalTotalAmount,
				createdAt: walletAsset.state.createdAt,
			})),
		};
	}
	private toDomain({ id, assets }: WalletDataMap): Wallet {
		return Wallet.load({
			id: id,
			assets: assets.map((asset) =>
				WalletAsset.load({
					id: asset.id,
					assetID: asset.assetID,
					sourceTradingID: asset.sourceTradingID,
					quantity: asset.quantity,
					operationDate: asset.operationDate,
					currency: asset.currency as Currency,
					acquisitionTotalAmount: asset.acquisitionTotalAmount,
					disposalTotalAmount: asset.disposalTotalAmount,
					createdAt: asset.createdAt,
				}),
			),
		});
	}
	async add(wallet: Wallet): Promise<void> {
		await this.database.transaction(async (trx) => {
			const { id, assets } = this.toPersistence(wallet);
			await trx.insert({ id }).into(WalletKnexRepository.walletTableName);
			if (assets.length)
				await trx(WalletKnexRepository.walletAssetTableName).insert(assets);
		});
	}
	async update(wallet: Wallet): Promise<void> {
		await this.database.transaction(async (trx) => {
			const { id, assets } = this.toPersistence(wallet);
			if (!assets.length)
				await trx(WalletKnexRepository.walletAssetTableName)
					.where("walletID", id)
					.delete();
			else {
				await trx(WalletKnexRepository.walletAssetTableName)
					.where("walletID", id)
					.andHavingNotIn(
						"id",
						assets.map((asset) => asset.id),
					)
					.delete();
				await trx(WalletKnexRepository.walletAssetTableName)
					.insert(assets)
					.onConflict()
					.merge();
			}
		});
	}
	async getByID(id: string): Promise<Wallet> {
		const wallet = await this.database
			.select("*")
			.from<Omit<WalletDataMap, "assets">>(WalletKnexRepository.walletTableName)
			.where("id", id)
			.first();
		if (!wallet) throw new WalletNotFound();
		const walletAssetsData = await this.database
			.from<WalletAssetDataMap>(WalletKnexRepository.walletAssetTableName)
			.where("walletID", wallet.id)
			.select("*");
		return this.toDomain({
			id,
			assets: walletAssetsData,
		});
	}
}
