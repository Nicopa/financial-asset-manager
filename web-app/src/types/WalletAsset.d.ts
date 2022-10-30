type Money = {
	amount: number;
	currency: string;
};
export type WalletAssetTrading = {
	quantity: number;
	acquisitionTotal: Money;
	acquisitionUnitCost: Money;
	disposalUnitCost: Money;
	disposalTotal: Money;
	totalExpectedReturn: Money;
	totalExpectedReturnRatio: number;
};
export type WalletAsset = WalletAssetTrading & {
	assetName: string;
	tradings: WalletAssetTrading[];
	walletPercentage: number;
};
export type WalletPieData = {
	assetName: string;
}[];
