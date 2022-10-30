import { Alert, Button, Card, Container, Snackbar, Stack } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { AddTradingDialog } from "../components/feedback/AddTradingDialog";
import { TradingsFilterForm } from "../components/form";
import { AddFiltersDialog } from "../components/feedback/AddFiltersDialog";
import {
	StandardTable,
	StandardTableHeading,
} from "../components/data-display/StandardTable";
import { useTable } from "../hooks/useTable";
import { Iconify } from "../components/data-display/Iconify";
import { DeleteTradingDialog } from "../components/feedback/DeleteTradingDialog";
import { useAssets } from "../hooks/useAssets";
import { useAccounts } from "../hooks/useAccounts";
import { useTradings } from "../hooks/useTradings";

const headings: StandardTableHeading[] = [
	{
		id: "options",
		label: "",
		align: "center",
	},
	{
		id: "assetName",
		label: "Asset",
		sortable: true,
	},
	{
		id: "brokerName",
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
		id: "quantity",
		label: "Quantity",
		align: "center",
		sortable: true,
	},
	{
		id: "grossTotal",
		label: "Gross total",
		align: "right",
		sortable: true,
	},
	{
		id: "unitCost",
		label: "UnitCost",
		align: "right",
		sortable: true,
	},
	{
		id: "fee",
		label: "Fee",
		align: "right",
		sortable: true,
	},
	{
		id: "brokerageFee",
		label: "Brokerage fee",
		align: "right",
		sortable: true,
	},
	{
		id: "netTotal",
		label: "Net total",
		align: "right",
	},
];
export const TradingsPage = () => {
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
	const { assets } = useAssets();
	const { accounts } = useAccounts();
	const {
		tradings,
		tradingFilters,
		setTradingFilters,
		selectedTrading,
		setSelectedTrading,
		loadTradings,
	} = useTradings(rowsPerPage, currentPageIndex, setRowsTotal);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [openFiltersForm, setOpenFiltersForm] = useState<boolean>(false);
	const [openAddTradingForm, setOpenAddTradingForm] = useState<boolean>(false);
	const handleTradingsFilterFormSubmit: FormEventHandler<HTMLFormElement> = (
		event,
	) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		setTradingFilters({
			brokerID: (formData.get("brokerID") as string) || undefined,
			assetName: (formData.get("assetName") as string) || undefined,
			assetType: (formData.get("assetType") as string) || undefined,
			operation: (formData.get("operation") as string) || undefined,
			operationDate: (formData.get("operationDate") as string) || undefined,
			operationDateComparisonOperator:
				(formData.get("operationDateComparisonOperator") as string) ||
				undefined,
			settlementDate: (formData.get("settlementDate") as string) || undefined,
			settlementDateComparisonOperator:
				(formData.get("settlementDateComparisonOperator") as string) ||
				undefined,
			currency: (formData.get("currency") as string) || undefined,
			grossTotalAmount:
				parseFloat(formData.get("grossTotalAmount") as string) || undefined,
			grossTotalAmountComparisonOperator:
				(formData.get("grossTotalAmountComparisonOperator") as string) ||
				undefined,
		});
	};
	const handleDeleteTradingSuccessResponse = () => {
		setAlertMessage("Trading deleted");
		setSelectedTrading(undefined);
		loadTradings();
	};
	const handleOnCancelAddTradingDialog = () => setOpenAddTradingForm(false);
	const handleAddTradingDialogSuccessResponse = () => {
		setAlertMessage("Trading created");
		setOpenAddTradingForm(false);
		setTimeout(loadTradings, 1000);
	};
	return (
		<Container>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="flex-end"
				mb={5}
			>
				<Button
					variant="contained"
					onClick={() => setOpenAddTradingForm(true)}
					startIcon={<Iconify icon="eva:plus-fill" />}
				>
					New Trading
				</Button>
			</Stack>
			<Card>
				<StandardTable
					title="Tradings"
					headings={headings}
					orderBy={orderBy}
					order={order}
					entries={tradings}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					rowsPerPage={rowsPerPage}
					rowsTotal={rowsTotal}
					currentPageIndex={currentPageIndex}
					onSortHandler={createOrderHandler}
					onFilterClick={() => setOpenFiltersForm(true)}
				/>
			</Card>
			<AddFiltersDialog
				formID="tradings-filter"
				open={openFiltersForm}
				onCancel={() => setOpenFiltersForm(false)}
			>
				<TradingsFilterForm
					id="tradings-filter"
					filters={tradingFilters}
					accounts={accounts}
					onSubmit={handleTradingsFilterFormSubmit}
				/>
			</AddFiltersDialog>
			<AddTradingDialog
				open={openAddTradingForm}
				assets={assets}
				accounts={accounts}
				onCancel={handleOnCancelAddTradingDialog}
				onSuccessResponse={handleAddTradingDialogSuccessResponse}
			/>
			<DeleteTradingDialog
				onCancel={() => setSelectedTrading(undefined)}
				onSuccessResponse={handleDeleteTradingSuccessResponse}
				data={selectedTrading}
			/>
			<Snackbar
				open={!!alertMessage}
				autoHideDuration={6000}
				onClose={() => setAlertMessage(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			>
				<Alert
					onClose={() => setAlertMessage(null)}
					severity="success"
					sx={{ width: "100%" }}
				>
					{alertMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};
