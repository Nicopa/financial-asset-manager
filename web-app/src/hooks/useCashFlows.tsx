import { IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCashFlows, GetCashFlowsProps } from "../api/asset-manager";
import { Iconify } from "../components/data-display/Iconify";
import { Entry } from "../components/data-display/StandardTable";

export type CashFlowFilters = {
	brokerID?: string;
	source?: string;
	valueAmount?: number;
	valueAmountComparisonOperator?: string;
	valueCurrency?: string;
	operation?: string;
	operationDate?: string;
	operationDateComparisonOperator?: string;
	settlementDate?: string;
	settlementDateComparisonOperator?: string;
};
type SelectedCashFlow = {
	id: string;
	operationDate: Date;
	settlementDate: Date;
	brokerCompanyName: string;
	operation: string | JSX.Element;
	value: string;
};
export const useCashFlows = (
	rowsPerPage: number,
	currentPageIndex: number,
	setRowsTotal: (value: number) => void,
) => {
	const [searchParams] = useSearchParams();
	const [cashFlows, setCashFlows] = useState<Entry[] | undefined>(undefined);
	const [cashFlowFilters, setCashFlowFilters] = useState<CashFlowFilters>({});
	const [selectedDepositOrWithdraw, setSelectedDepositOrWithdraw] =
		useState<SelectedCashFlow | undefined>(undefined);

	const loadCashFlows = useCallback(async () => {
		const filters: GetCashFlowsProps = {
			...cashFlowFilters,
			limit: String(rowsPerPage),
			offset: String(rowsPerPage * currentPageIndex),
		};
		if (!filters.brokerID)
			filters.brokerID = searchParams.get("brokerID") || undefined;
		if (!filters.source)
			filters.source = searchParams.get("source") || undefined;
		if (!filters.valueAmount)
			filters.valueAmount = searchParams.get("valueAmount")
				? parseFloat(searchParams.get("valueAmount") as string)
				: undefined;
		if (!filters.valueAmountComparisonOperator)
			filters.valueAmountComparisonOperator =
				searchParams.get("valueAmountComparisonOperator") || undefined;
		if (!filters.valueCurrency)
			filters.valueCurrency = searchParams.get("currency") || undefined;
		if (!filters.operation)
			filters.operation = searchParams.get("operation") || undefined;
		if (!filters.operationDate)
			filters.operationDate = searchParams.get("operationDate") || undefined;
		if (!filters.operationDateComparisonOperator)
			filters.operationDateComparisonOperator =
				searchParams.get("operationDateComparisonOperator") || undefined;
		if (!filters.settlementDate)
			filters.settlementDate = searchParams.get("settlementDate") || undefined;
		if (!filters.settlementDateComparisonOperator)
			filters.settlementDateComparisonOperator =
				searchParams.get("settlementDateComparisonOperator") || undefined;
		const { total, results } = await getCashFlows(filters);
		const entries: Entry[] = results.map(
			({
				id,
				broker,
				value: { amount, currency },
				operation,
				source,
				operationDate,
				settlementDate,
			}: any) => ({
				operationDate: { value: new Date(operationDate) },
				settlementDate: { value: new Date(settlementDate) },
				brokerCompanyName: { value: broker.companyName },
				operation: { value: operation, align: "center" },
				valueAmount: {
					value: new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency,
					}).format(amount),
					align: "right",
				},
				deleteOtion: {
					value:
						source === "DEPOSIT" || source === "WITHDRAW" ? (
							<IconButton
								aria-label="Delete"
								color="error"
								onClick={() =>
									setSelectedDepositOrWithdraw({
										id,
										operationDate: new Date(operationDate),
										settlementDate: new Date(settlementDate),
										brokerCompanyName: broker.companyName,
										operation,
										value: new Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency,
										}).format(amount),
									})
								}
							>
								<Iconify
									icon="eva:trash-2-outline"
									sx={{ width: 20, height: 20 }}
								/>
							</IconButton>
						) : null,
				},
			}),
		);
		setCashFlows(entries);
		setRowsTotal(total);
	}, [
		cashFlowFilters,
		currentPageIndex,
		rowsPerPage,
		searchParams,
		setRowsTotal,
	]);
	useEffect(() => {
		setCashFlows(undefined);
		loadCashFlows();
	}, [loadCashFlows]);
	return {
		cashFlows,
		cashFlowFilters,
		setCashFlowFilters,
		selectedDepositOrWithdraw,
		setSelectedDepositOrWithdraw,
		loadCashFlows,
	};
};
