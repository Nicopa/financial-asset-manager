import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getEarnings, GetEarningsProps } from "../api/asset-manager";
import { Iconify } from "../components/data-display/Iconify";
import { Entry } from "../components/data-display/StandardTable";
import { MoreMenu } from "../components/navigation/MoreMenu";
import { Earning } from "../types";

export type EarningFilters = {
	brokerID?: string;
	assetName?: string;
	assetType?: string;
	operationDate?: string;
	operationDateComparisonOperator?: string;
	settlementDate?: string;
	settlementDateComparisonOperator?: string;
	valueAmount?: number;
	valueAmountComparisonOperator?: string;
	valueCurrency?: string;
	type?: string;
	quantity?: number;
	quantityComparisonOperator?: string;
};
export const useEarnings = (
	rowsPerPage: number,
	currentPageIndex: number,
	setRowsTotal: (value: number) => void,
) => {
	const [searchParams] = useSearchParams();
	const [earnings, setEarnings] = useState<Entry[] | undefined>(undefined);
	const [earningFilters, setEarningFilters] = useState<EarningFilters>({});
	const [selectedEarning, setSelectedEarning] =
		useState<Earning | undefined>(undefined);
	const loadEarnings = useCallback(async () => {
		const filters: GetEarningsProps = {
			...earningFilters,
			limit: String(rowsPerPage),
			offset: String(rowsPerPage * currentPageIndex),
		};
		const brokerID = searchParams.get("brokerID");
		if (brokerID) filters.brokerID = brokerID;
		const { total, results } = await getEarnings(filters);
		const entries: Entry[] = results.map(
			({
				id,
				broker,
				asset,
				operation,
				operationDate,
				settlementDate,
				value,
				type,
				quantity,
			}: any) => ({
				options: {
					value: (
						<MoreMenu
							anchorOrigin={{ vertical: "top", horizontal: "right" }}
							transformOrigin={{ vertical: "top", horizontal: "left" }}
						>
							<MenuItem
								onClick={() =>
									setSelectedEarning({
										id,
										brokerName: broker.companyName,
										assetName: asset.name,
										operationDate: new Date(operationDate),
										settlementDate: new Date(settlementDate),
										quantity,
										valueAmount: value.amount,
										valueCurrency: value.currency,
										type,
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
				operationDate: { value: new Date(operationDate) },
				settlementDate: { value: new Date(settlementDate) },
				value: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: value.currency,
					}).format(value.amount),
					align: "right",
				},
				type: { value: type, align: "center" },
				quantity: { value: quantity, align: "center" },
			}),
		);
		setEarnings(entries);
		setRowsTotal(total);
	}, [
		currentPageIndex,
		rowsPerPage,
		searchParams,
		setRowsTotal,
		earningFilters,
	]);
	useEffect(() => {
		setEarnings(undefined);
		loadEarnings();
	}, [loadEarnings]);
	return {
		earnings,
		earningFilters,
		setEarningFilters,
		selectedEarning,
		setSelectedEarning,
		loadEarnings,
	};
};
