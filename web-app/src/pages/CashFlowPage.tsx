import { Card, Container } from "@mui/material";
import { FormEventHandler, useState } from "react";
import {
	StandardTable,
	StandardTableHeading,
} from "../components/data-display/StandardTable";
import { AddFiltersDialog } from "../components/feedback/AddFiltersDialog";
import { DeleteDepositOrWithdrawDialog } from "../components/feedback/DeleteDepositOrWithdrawDialog";
import { CashFlowFilterForm } from "../components/form";
import { useAccounts } from "../hooks/useAccounts";
import { useCashFlows } from "../hooks/useCashFlows";
import { useTable } from "../hooks/useTable";

const headings: StandardTableHeading[] = [
	{
		id: "operationDate",
		label: "Operation date",
		sortable: true,
	},
	{
		id: "settlementDate",
		label: "Settlement date",
		sortable: true,
	},
	{
		id: "brokerCompanyName",
		label: "Broker",
		sortable: true,
	},
	{
		id: "operation",
		label: "Operation",
		align: "center",
		sortable: true,
	},
	{
		id: "valueAmount",
		label: "Value",
		align: "right",
		sortable: true,
	},
	{
		id: "deleteOption",
		label: "",
		align: "center",
	},
];

export const CashFlowPage = () => {
	const {
		order,
		orderBy,
		currentPageIndex,
		rowsPerPage,
		rowsTotal,
		setRowsTotal,
		handleChangePage,
		handleChangeRowsPerPage,
		createOrderHandler,
	} = useTable({
		orderBy: "operationDate",
		order: "desc",
	});
	const { accounts } = useAccounts();
	const {
		cashFlows,
		cashFlowFilters,
		setCashFlowFilters,
		selectedDepositOrWithdraw,
		setSelectedDepositOrWithdraw,
		loadCashFlows,
	} = useCashFlows(rowsPerPage, currentPageIndex, setRowsTotal);
	const [openFiltersForm, setOpenFiltersForm] = useState<boolean>(false);

	const handleCashFlowFilterFormSubmit: FormEventHandler<HTMLFormElement> = (
		event,
	) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		setCashFlowFilters({
			brokerID: (formData.get("brokerID") as string) || undefined,
			source: (formData.get("source") as string) || undefined,
			valueAmount:
				parseFloat(formData.get("valueAmount") as string) || undefined,
			valueAmountComparisonOperator:
				(formData.get("valueAmountComparisonOperator") as string) || undefined,
			valueCurrency: (formData.get("valueCurrency") as string) || undefined,
			operation: (formData.get("operation") as string) || undefined,
			operationDate: (formData.get("operationDate") as string) || undefined,
			operationDateComparisonOperator:
				(formData.get("operationDateComparisonOperator") as string) ||
				undefined,
			settlementDate: (formData.get("settlementDate") as string) || undefined,
			settlementDateComparisonOperator:
				(formData.get("settlementDateComparisonOperator") as string) ||
				undefined,
		});
		setOpenFiltersForm(false);
	};
	const handleDeleteDepositOrWithdrawSuccessResponse = () => {
		setSelectedDepositOrWithdraw(undefined);
		loadCashFlows();
	};
	return (
		<Container>
			<Card>
				<StandardTable
					title="Cash Flow"
					headings={headings}
					orderBy={orderBy}
					order={order}
					entries={cashFlows}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					rowsPerPage={rowsPerPage}
					rowsTotal={rowsTotal}
					currentPageIndex={currentPageIndex}
					onSortHandler={createOrderHandler}
					onFilterClick={() => setOpenFiltersForm(true)}
				/>
				<AddFiltersDialog
					formID="cash-flow-filter"
					open={openFiltersForm}
					onCancel={() => setOpenFiltersForm(false)}
				>
					<CashFlowFilterForm
						id="cash-flow-filter"
						filters={cashFlowFilters}
						accounts={accounts}
						onSubmit={handleCashFlowFilterFormSubmit}
					/>
				</AddFiltersDialog>
				<DeleteDepositOrWithdrawDialog
					onCancel={() => setSelectedDepositOrWithdraw(undefined)}
					onSuccessResponse={handleDeleteDepositOrWithdrawSuccessResponse}
					data={selectedDepositOrWithdraw}
				/>
			</Card>
		</Container>
	);
};
