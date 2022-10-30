import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTradings, GetTradingsProps } from "../api/asset-manager";
import { Iconify } from "../components/data-display/Iconify";
import { Entry } from "../components/data-display/StandardTable";
import { MoreMenu } from "../components/navigation/MoreMenu";
import { Trading } from "../types";

export type TradingFilters = {
	brokerID?: string;
	assetName?: string;
	assetType?: string;
	operation?: string;
	operationDate?: string;
	operationDateComparisonOperator?: string;
	settlementDate?: string;
	settlementDateComparisonOperator?: string;
	currency?: string;
	grossTotalAmount?: number;
	grossTotalAmountComparisonOperator?: string;
};
export const useTradings = (
	rowsPerPage: number,
	currentPageIndex: number,
	setRowsTotal: (value: number) => void,
) => {
	const [searchParams] = useSearchParams();
	const [tradings, setTradings] = useState<Entry[] | undefined>(undefined);
	const [tradingFilters, setTradingFilters] = useState<TradingFilters>({});
	const [selectedTrading, setSelectedTrading] =
		useState<Trading | undefined>(undefined);
	const loadTradings = useCallback(async () => {
		const filters: GetTradingsProps = {
			...tradingFilters,
			limit: String(rowsPerPage),
			offset: String(rowsPerPage * currentPageIndex),
		};
		const brokerID = searchParams.get("brokerID");
		if (brokerID) filters.brokerID = brokerID;
		const { total, results } = await getTradings(filters);
		const entries: Entry[] = results.map(
			({
				id,
				broker,
				asset,
				operation,
				operationDate,
				settlementDate,
				quantity,
				grossTotal,
				unitCost,
				fee,
				brokerageFee,
				netTotal,
			}: any) => ({
				options: {
					value: (
						<MoreMenu
							anchorOrigin={{ vertical: "top", horizontal: "right" }}
							transformOrigin={{ vertical: "top", horizontal: "left" }}
						>
							<MenuItem
								onClick={() =>
									setSelectedTrading({
										id,
										brokerName: broker.companyName,
										assetName: asset.name,
										operation,
										operationDate: new Date(operationDate),
										settlementDate: new Date(settlementDate),
										quantity,
										grossTotalAmount: grossTotal.amount,
										grossTotalCurrency: grossTotal.currency,
										unitCost: unitCost.amount,
										netTotal: netTotal.amount,
										feeAmount: fee?.amount || null,
										feeCurrency: fee?.currency || null,
										brokerageFeeAmount: brokerageFee?.amount || null,
										brokerageFeeCurrency: brokerageFee?.currency || null,
									})
								}
							>
								<ListItemIcon>
									<Iconify icon="eva:trash-2-outline" />
								</ListItemIcon>
								<ListItemText>Delete</ListItemText>
							</MenuItem>
						</MoreMenu>
					),
					align: "center",
					sx: {
						position: "sticky",
						left: 0,
						zIndex: 2,
						backgroundColor: "background.paper",
						padding: 0,
					},
				},
				assetName: { value: asset.name },
				brokerName: { value: broker.companyName },
				operation: { value: operation, align: "center" },
				operationDate: { value: new Date(operationDate) },
				settlementDate: { value: new Date(settlementDate) },
				quantity: { value: quantity, align: "center" },
				grossTotal: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: grossTotal.currency,
					}).format(grossTotal.amount),
					align: "right",
				},
				unitCost: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: unitCost.currency,
					}).format(unitCost.amount),
					align: "right",
				},
				fee: fee
					? {
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: fee.currency,
							}).format(fee.amount),
							align: "right",
					  }
					: undefined,
				brokerageFee: brokerageFee
					? {
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: brokerageFee.currency,
							}).format(brokerageFee.amount),
							align: "right",
					  }
					: undefined,
				netTotal: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: netTotal.currency,
					}).format(netTotal.amount),
					align: "right",
				},
			}),
		);
		setTradings(entries);
		setRowsTotal(total);
	}, [
		tradingFilters,
		currentPageIndex,
		rowsPerPage,
		searchParams,
		setRowsTotal,
	]);
	useEffect(() => {
		setTradings(undefined);
		loadTradings();
	}, [loadTradings]);
	return {
		tradings,
		tradingFilters,
		setTradingFilters,
		selectedTrading,
		setSelectedTrading,
		loadTradings,
	};
};
