import { Query } from "../../../../core/application";
import { AccountDataGateway } from "../../../account/data-gateway";
import { AssetNameValue } from "../../../asset/domain/asset-name/AssetName";
import { AssetTypeValue } from "../../../asset/domain/asset-type";
import { AssetIDType } from "../../../asset/domain/id";
import { CDBDataGateway } from "../../../cdb/data-gateway";
import { CDBTypeValue } from "../../../cdb/domain/CDBType";
import { InvestorIDType } from "../../../investor/domain/id";
import { Currency } from "../../../money/domain";
import { WalletDataGateway } from "../../data-gateway/WalletDataGateway";
import {
	PooledWalletAsset,
	WalletAssetCalculator,
} from "../../domain/wallet-asset-calculator/WalletAssetCalculator";

export type GetWalletPieDataRequestModel = {
	investorID: InvestorIDType;
};
export type GetWalletPieDataResponseModel = {
	assetName: AssetNameValue;
	walletPercentage: number;
}[];
export class GetWalletPieData
	implements Query<GetWalletPieDataRequestModel, GetWalletPieDataResponseModel>
{
	constructor(
		private readonly walletDataGateway: WalletDataGateway,
		private readonly accountDataGateway: AccountDataGateway,
		private readonly cdbDataGateway: CDBDataGateway,
	) {}
	async get({
		investorID,
	}: GetWalletPieDataRequestModel): Promise<GetWalletPieDataResponseModel> {
		const walletData = await this.walletDataGateway.getByID(investorID);
		const cdbs: {
			assetID: AssetIDType;
			type: CDBTypeValue;
			interestRate: number;
		}[] = [];
		for (const walletAsset of walletData.assets) {
			if (
				walletAsset.type === "CDB" &&
				!cdbs.find((cdb) => cdb.assetID !== walletAsset.assetID)
			) {
				const cdb = await this.cdbDataGateway.getByID(walletAsset.assetID);
				cdbs.push({
					assetID: walletAsset.assetID,
					type: cdb.type,
					interestRate: cdb.interestRate!,
				});
			}
		}
		const pooledWalletAssets: (PooledWalletAsset & {
			assetID: AssetIDType;
			assetType: AssetTypeValue;
			currency: Currency;
			lastPrice: number;
		})[] = WalletAssetCalculator.getPooledWalletAssets(walletData, cdbs);
		const accounts = await this.accountDataGateway.getAllByInvestorID(
			investorID,
		);
		const brlBalance = accounts.reduce(
			(previousValue, account) => previousValue + account.BRLbalance,
			0,
		);
		const usdBalance = accounts.reduce(
			(previousValue, account) => previousValue + account.USDbalance,
			0,
		);
		const total =
			pooledWalletAssets.reduce(
				(previousValue, pooledWalletAsset) =>
					previousValue + pooledWalletAsset.walletValueAmount,
				0,
			) +
			brlBalance +
			usdBalance * 5;
		console.log(total);
		return pooledWalletAssets.map((walletAsset) => ({
			assetName: walletAsset.assetName,
			walletPercentage:
				Math.round((walletAsset.walletValueAmount / total) * 100) / 100,
		}));
	}
}
