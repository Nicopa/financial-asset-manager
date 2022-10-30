import { useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getWallet } from "../api/asset-manager";
import { Entry } from "../components/data-display/StandardTable";

export const useWallet = () => {
	const [walletAssets, setWalletAssets] =
		useState<Entry[] | undefined>(undefined);
	const theme = useTheme();
	const loadWallet = useCallback(async () => {
		const result = await getWallet();
		setWalletAssets(
			result.map((asset) => ({
				assetName: { value: asset.assetName },
				quantity: { value: asset.quantity, align: "center" },
				acquisitionTotal: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: asset.acquisitionTotal.currency,
					}).format(asset.acquisitionTotal.amount),
					align: "right",
				},
				acquisitionUnitCost: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: asset.acquisitionUnitCost.currency,
					}).format(asset.acquisitionUnitCost.amount),
					align: "right",
				},
				disposalUnitCost: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: asset.disposalUnitCost.currency,
					}).format(asset.disposalUnitCost.amount),
					align: "right",
				},
				disposalTotal: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: asset.disposalTotal.currency,
					}).format(asset.disposalTotal.amount),
					align: "right",
				},
				totalExpectedReturn: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: asset.totalExpectedReturn.currency,
					}).format(asset.totalExpectedReturn.amount),
					align: "right",
				},
				totalExpectedReturnRatio: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "percent",
						maximumFractionDigits: 2,
					}).format(asset.totalExpectedReturnRatio),
					align: "right",
					sx: {
						color:
							asset.totalExpectedReturnRatio >= 0
								? theme.palette.success.dark
								: theme.palette.error.dark,
					},
				},
				walletPercentage: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "percent",
						maximumFractionDigits: 2,
					}).format(asset.walletPercentage),
					align: "right",
					sortable: true,
				},
				tradings: {
					align: "center",
					children: asset.tradings.map((trading) => ({
						assetName: { value: asset.assetName },
						quantity: { value: trading.quantity, align: "center" },
						acquisitionTotal: {
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: trading.acquisitionTotal.currency,
							}).format(trading.acquisitionTotal.amount),
							align: "right",
						},
						acquisitionUnitCost: {
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: trading.acquisitionUnitCost.currency,
							}).format(trading.acquisitionUnitCost.amount),
							align: "right",
						},
						disposalUnitCost: {
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: trading.disposalUnitCost.currency,
							}).format(trading.disposalUnitCost.amount),
							align: "right",
						},
						disposalTotal: {
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: trading.disposalTotal.currency,
							}).format(trading.disposalTotal.amount),
							align: "right",
						},
						totalExpectedReturn: {
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: trading.totalExpectedReturn.currency,
							}).format(trading.totalExpectedReturn.amount),
							align: "right",
						},
						totalExpectedReturnRatio: {
							value: new Intl.NumberFormat("pt-BR", {
								style: "percent",
								maximumFractionDigits: 2,
							}).format(trading.totalExpectedReturnRatio),
							align: "right",
						},
					})),
				},
			})),
		);
	}, [theme.palette.error.dark, theme.palette.success.dark]);
	useEffect(() => {
		setWalletAssets(undefined);
		loadWallet();
	}, [loadWallet, setWalletAssets]);
	return {
		walletAssets,
		setWalletAssets,
		loadWallet,
	};
};
