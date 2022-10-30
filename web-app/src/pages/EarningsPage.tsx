import { Alert, Button, Card, Container, Snackbar, Stack } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { AddFiltersDialog } from "../components/feedback/AddFiltersDialog";
import {
	StandardTable,
	StandardTableHeading,
} from "../components/data-display/StandardTable";
import { useTable } from "../hooks/useTable";
import { Iconify } from "../components/data-display/Iconify";
import { useAssets } from "../hooks/useAssets";
import { useAccounts } from "../hooks/useAccounts";
import { useEarnings } from "../hooks/useEarnings";
import { EarningsFilterForm } from "../components/form";
import { AddEarningDialog } from "../components/feedback/AddEarningDialog";
import { DeleteEarningDialog } from "../components/feedback/DeleteEarningDialog";

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
		id: "type",
		label: "Type",
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
		id: "value",
		label: "Value",
		align: "right",
		sortable: true,
	},
];
export const EarningsPage = () => {
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
		earnings,
		earningFilters,
		setEarningFilters,
		selectedEarning,
		setSelectedEarning,
		loadEarnings,
	} = useEarnings(rowsPerPage, currentPageIndex, setRowsTotal);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [openFiltersForm, setOpenFiltersForm] = useState<boolean>(false);
	const [openAddEarningForm, setOpenAddEarningForm] = useState<boolean>(false);

	const handleEarningsFilterFormSubmit: FormEventHandler<HTMLFormElement> = (
		event,
	) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		setEarningFilters({
			brokerID: (formData.get("brokerID") as string) || undefined,
			assetName: (formData.get("assetName") as string) || undefined,
			assetType: (formData.get("assetType") as string) || undefined,
			operationDate: (formData.get("operationDate") as string) || undefined,
			operationDateComparisonOperator:
				(formData.get("operationDateComparisonOperator") as string) ||
				undefined,
			settlementDate: (formData.get("settlementDate") as string) || undefined,
			settlementDateComparisonOperator:
				(formData.get("settlementDateComparisonOperator") as string) ||
				undefined,
			valueAmount:
				parseFloat(formData.get("valueAmount") as string) || undefined,
			valueAmountComparisonOperator:
				(formData.get("valueAmountComparisonOperator") as string) || undefined,
			valueCurrency: (formData.get("valueCurrency") as string) || undefined,
			type: (formData.get("type") as string) || undefined,
			quantity: parseFloat(formData.get("quantity") as string) || undefined,
			quantityComparisonOperator:
				(formData.get("quantityComparisonOperator") as string) || undefined,
		});
	};
	const handleDeleteEarningSuccessResponse = () => {
		setAlertMessage("Earning deleted");
		setSelectedEarning(undefined);
		setTimeout(loadEarnings, 1000);
	};
	const handleOnCancelAddEarningDialog = () => setOpenAddEarningForm(false);
	const handleAddEarningDialogSuccessResponse = () => {
		setAlertMessage("Earning created");
		setOpenAddEarningForm(false);
		setTimeout(loadEarnings, 1000);
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
					onClick={() => setOpenAddEarningForm(true)}
					startIcon={<Iconify icon="eva:plus-fill" />}
				>
					New Earning
				</Button>
			</Stack>
			<Card>
				<StandardTable
					title="Earnings"
					headings={headings}
					orderBy={orderBy}
					order={order}
					entries={earnings}
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
				formID="earnings-filter"
				open={openFiltersForm}
				onCancel={() => setOpenFiltersForm(false)}
			>
				<EarningsFilterForm
					id="earnings-filter"
					filters={earningFilters}
					accounts={accounts}
					onSubmit={handleEarningsFilterFormSubmit}
				/>
			</AddFiltersDialog>
			<AddEarningDialog
				open={openAddEarningForm}
				assets={assets}
				accounts={accounts}
				onCancel={handleOnCancelAddEarningDialog}
				onSuccessResponse={handleAddEarningDialogSuccessResponse}
			/>
			<DeleteEarningDialog
				onCancel={() => setSelectedEarning(undefined)}
				onSuccessResponse={handleDeleteEarningSuccessResponse}
				data={selectedEarning}
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
