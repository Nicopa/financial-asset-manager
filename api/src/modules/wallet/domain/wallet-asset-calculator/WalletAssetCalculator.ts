import { AssetNameValue } from "../../../asset/domain/asset-name";
import { AssetTypeValue } from "../../../asset/domain/asset-type";
import { AssetIDType } from "../../../asset/domain/id";
import { CDBReturnCalculator } from "../../../cdb/domain/cdb-return-calculator";
import { CDBTypeValue } from "../../../cdb/domain/CDBType";
import { Currency, MoneyValue } from "../../../money/domain";
import { getWorkingDaysBetween } from "../../../utils/workingDaysBetween";
import { WalletDataMap } from "../../data-gateway/WalletDataGateway";

export type WalletAssetTrading = {
	quantity: number;
	operationDate: Date;
	acquisitionTotal?: MoneyValue;
	acquisitionUnitCost?: MoneyValue;
	disposalUnitCost?: MoneyValue;
	disposalTotal?: MoneyValue;
	totalExpectedReturn?: MoneyValue;
	totalExpectedReturnRatio?: number;
};
export type PooledWalletAsset = {
	assetID: AssetIDType;
	assetName: AssetNameValue;
	assetType: AssetTypeValue;
	quantity: number;
	currency: Currency;
	tradings: WalletAssetTrading[];
	acquisitionTotal?: MoneyValue;
	acquisitionUnitCost?: MoneyValue;
	disposalUnitCost?: MoneyValue;
	disposalTotal?: MoneyValue;
	totalExpectedReturn?: MoneyValue;
	totalExpectedReturnRatio?: number;
	lastPrice: number;
	walletValueAmount: number;
};
export class WalletAssetCalculator {
	public static getWalletAssetTrading(
		quantity: number,
		operationDate: Date,
		currency: Currency,
		acquisitionTotalAmount?: number,
		disposalTotalAmount?: number,
	): WalletAssetTrading {
		return {
			quantity,
			operationDate,
			acquisitionTotal: acquisitionTotalAmount
				? {
						amount: acquisitionTotalAmount,
						currency: currency as Currency,
				  }
				: undefined,
			acquisitionUnitCost: acquisitionTotalAmount
				? {
						amount: Math.abs(acquisitionTotalAmount / quantity),
						currency: currency as Currency,
				  }
				: undefined,
			disposalUnitCost: disposalTotalAmount
				? {
						amount: disposalTotalAmount / quantity,
						currency: currency as Currency,
				  }
				: undefined,
			disposalTotal: disposalTotalAmount
				? {
						amount: disposalTotalAmount,
						currency: currency as Currency,
				  }
				: undefined,
		};
	}
	public static getAvgUnitCost(amount: number, quantity: number): number {
		return amount / quantity;
	}
	public static getTotalExpectedReturn(
		acquisitionTotalAmount: number,
		disposalTotalAmount: number,
		incomeTaxPercentage: number,
	): number {
		const totalAmount = disposalTotalAmount - acquisitionTotalAmount;
		if (totalAmount <= 0) return totalAmount;
		return totalAmount * (1 - incomeTaxPercentage);
	}
	public static getReturnRatio(
		acquisitionTotalAmount: number,
		disposalTotalAmount: number,
		incomeTaxPercentage: number,
	): number {
		const totalReturn = WalletAssetCalculator.getTotalExpectedReturn(
			acquisitionTotalAmount,
			disposalTotalAmount,
			incomeTaxPercentage,
		);
		return totalReturn / acquisitionTotalAmount;
	}
	public static removeDisposal(
		trading: WalletAssetTrading,
		tradings: WalletAssetTrading[],
	): WalletAssetTrading[] {
		let toDecrease = -trading.quantity;
		while (toDecrease > 0) {
			const acquisition = tradings.find((trading) => trading.quantity > 0);
			if (!acquisition) break;
			else if (acquisition.quantity < toDecrease) {
				toDecrease -= acquisition.quantity;
				tradings = tradings.filter((trading) => trading !== acquisition);
			} else {
				acquisition.quantity -= toDecrease;
				toDecrease = 0;
				acquisition.acquisitionTotal = {
					amount:
						acquisition.acquisitionUnitCost!.amount * acquisition.quantity,
					currency: acquisition.acquisitionTotal!.currency,
				};
			}
		}
		return tradings.filter((t) => t !== trading);
	}
	public static removeFixedIncomeDisposalTrading(
		pooledWalletAsset: PooledWalletAsset,
	) {
		for (const trading of pooledWalletAsset.tradings) {
			if (pooledWalletAsset.assetType === "CDB" && trading.quantity < 0) {
				pooledWalletAsset.tradings = WalletAssetCalculator.removeDisposal(
					trading,
					pooledWalletAsset.tradings,
				);
				continue;
			}
		}
	}
	public static calculateTradings(
		pooledWalletAsset: PooledWalletAsset,
		cdbs: {
			assetID: AssetIDType;
			type: CDBTypeValue;
			interestRate: number;
		}[],
	) {
		for (const trading of pooledWalletAsset.tradings) {
			if (pooledWalletAsset.assetType === "CDB") {
				const cdb = cdbs.find(
					(cdb) => cdb.assetID === pooledWalletAsset.assetID,
				);
				if (!cdb) throw new Error("CDB not found on wallet asset calculation.");
				trading.disposalTotal = {
					amount:
						cdb.type === "PREFIXED"
							? CDBReturnCalculator.getPrefixedTotalReturn(
									trading.acquisitionTotal!.amount,
									cdb.interestRate!,
									getWorkingDaysBetween(trading.operationDate, new Date()),
							  )
							: CDBReturnCalculator.getPostfixedCDITotalReturn(
									trading.acquisitionTotal!.amount,
									0.1,
									cdb.interestRate!,
									getWorkingDaysBetween(trading.operationDate, new Date()),
							  ),
					currency: pooledWalletAsset.currency,
				};
			} else {
				const currentPriceValue = {
					amount: Math.abs(pooledWalletAsset.lastPrice * trading.quantity),
					currency: pooledWalletAsset.currency,
				};
				if (trading.acquisitionTotal) trading.disposalTotal = currentPriceValue;
				else trading.acquisitionTotal = currentPriceValue;
			}
			if (!trading.acquisitionUnitCost)
				trading.acquisitionUnitCost = {
					amount: Math.abs(trading.acquisitionTotal!.amount / trading.quantity),
					currency: pooledWalletAsset.currency,
				};
			if (!trading.disposalUnitCost)
				trading.disposalUnitCost = {
					amount: Math.abs(trading.disposalTotal!.amount / trading.quantity),
					currency: pooledWalletAsset.currency,
				};
			trading.totalExpectedReturn = {
				amount: WalletAssetCalculator.getTotalExpectedReturn(
					trading.acquisitionTotal!.amount,
					trading.disposalTotal!.amount,
					0,
				),
				currency: pooledWalletAsset.currency,
			};
			trading.totalExpectedReturnRatio = WalletAssetCalculator.getReturnRatio(
				trading.acquisitionTotal!.amount,
				trading.disposalTotal!.amount,
				0,
			);
		}
	}
	public static calculatePool(pooledWalletAsset: PooledWalletAsset) {
		let acquisitionTotalAmount = 0;
		let disposalTotalAmount = 0;
		for (const trading of pooledWalletAsset.tradings) {
			pooledWalletAsset.quantity += trading.quantity;
			acquisitionTotalAmount += trading.acquisitionTotal!.amount;
			disposalTotalAmount += trading.disposalTotal!.amount;
		}
		pooledWalletAsset.acquisitionTotal = {
			amount: acquisitionTotalAmount,
			currency: pooledWalletAsset.currency,
		};
		pooledWalletAsset.acquisitionUnitCost = {
			amount:
				Math.round(
					Math.abs(acquisitionTotalAmount / pooledWalletAsset.quantity) * 100,
				) / 100,
			currency: pooledWalletAsset.currency,
		};
		pooledWalletAsset.disposalTotal = {
			amount: disposalTotalAmount,
			currency: pooledWalletAsset.currency,
		};
		pooledWalletAsset.disposalUnitCost = {
			amount:
				Math.round(
					Math.abs(disposalTotalAmount / pooledWalletAsset.quantity) * 100,
				) / 100,
			currency: pooledWalletAsset.currency,
		};
		pooledWalletAsset.totalExpectedReturn = {
			amount: WalletAssetCalculator.getTotalExpectedReturn(
				pooledWalletAsset.acquisitionTotal!.amount,
				pooledWalletAsset.disposalTotal!.amount,
				0,
			),
			currency: pooledWalletAsset.currency,
		};
		pooledWalletAsset.totalExpectedReturnRatio =
			WalletAssetCalculator.getReturnRatio(
				pooledWalletAsset.acquisitionTotal!.amount,
				pooledWalletAsset.disposalTotal!.amount,
				0,
			);
		if (pooledWalletAsset.quantity < 0)
			pooledWalletAsset.walletValueAmount -= acquisitionTotalAmount;
		else pooledWalletAsset.walletValueAmount += disposalTotalAmount;
		if (pooledWalletAsset.currency === "USD")
			pooledWalletAsset.walletValueAmount *= 5;
	}
	public static getPooledWalletAssets(
		walletData: WalletDataMap,
		cdbs: {
			assetID: AssetIDType;
			type: CDBTypeValue;
			interestRate: number;
		}[],
	): PooledWalletAsset[] {
		const pooledWalletAssets: PooledWalletAsset[] = [];
		for (const walletAssetData of walletData.assets) {
			const walletAssetTrading = WalletAssetCalculator.getWalletAssetTrading(
				walletAssetData.quantity,
				walletAssetData.operationDate,
				walletAssetData.currency as Currency,
				walletAssetData.acquisitionTotalAmount,
				walletAssetData.disposalTotalAmount,
			);
			const pooledWalletAsset = pooledWalletAssets.find(
				(pooledWalletAsset) =>
					pooledWalletAsset.assetID === walletAssetData.assetID,
			);
			if (pooledWalletAsset)
				pooledWalletAsset.tradings.push(walletAssetTrading);
			else {
				pooledWalletAssets.push({
					assetID: walletAssetData.assetID,
					assetName: walletAssetData.assetName,
					assetType: walletAssetData.type,
					lastPrice: walletAssetData.lastPrice,
					currency: walletAssetData.currency as Currency,
					quantity: 0,
					tradings: [walletAssetTrading],
					walletValueAmount: 0,
				});
			}
		}
		for (const pooledWalletAsset of pooledWalletAssets) {
			WalletAssetCalculator.removeFixedIncomeDisposalTrading(pooledWalletAsset);
			WalletAssetCalculator.calculateTradings(pooledWalletAsset, cdbs);
			WalletAssetCalculator.calculatePool(pooledWalletAsset);
		}
		return pooledWalletAssets;
	}
}
