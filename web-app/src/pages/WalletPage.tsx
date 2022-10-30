import { Card, Container, Grid, useTheme } from "@mui/material";
import { useMemo } from "react";
import { PieChart } from "../components/data-display/PieChart";
import {
	StandardTable,
	StandardTableHeading,
} from "../components/data-display/StandardTable";
import { SummaryCard } from "../components/data-display/SummaryCard";
import { useAccounts } from "../hooks/useAccounts";
import { useTable } from "../hooks/useTable";
import { useWallet } from "../hooks/useWallet";

const headings: StandardTableHeading[] = [
	{
		id: "assetName",
		label: "Asset",
		sortable: true,
	},
	{
		id: "quantity",
		label: "Quantity",
		align: "center",
		sortable: true,
	},
	{
		id: "acquisitionTotal",
		label: "Acq. total",
		align: "right",
		sortable: true,
	},
	{
		id: "acquisitionUnitCost",
		label: "Acq. unit cost",
		align: "right",
		sortable: true,
	},
	{
		id: "disposalUnitCost",
		label: "Dis. unit cost",
		align: "right",
		sortable: true,
	},
	{
		id: "disposalTotal",
		label: "Dis. total",
		align: "right",
		sortable: true,
	},
	{
		id: "totalExpectedReturn",
		label: "Return",
		align: "right",
		sortable: true,
	},
	{
		id: "totalExpectedReturnRatio",
		label: "Return ratio",
		align: "right",
		sortable: true,
	},
	{
		id: "walletPercentage",
		label: "Wallet %",
		align: "right",
		sortable: true,
	},
];
export const WalletPage = () => {
	const theme = useTheme();
	const {
		order,
		orderBy,
		currentPageIndex,
		rowsPerPage,
		rowsTotal,
		handleChangePage,
		handleChangeRowsPerPage,
		createOrderHandler,
	} = useTable({
		orderBy: "assetName",
		order: "desc",
	});
	const { walletAssets } = useWallet();
	const { accounts } = useAccounts();
	const totalBRLBalance = useMemo(
		() => accounts?.reduce((sum, account) => sum + account.BRLbalance, 0) || 0,
		[accounts],
	);
	const totalUSDBalance = useMemo(
		() => accounts?.reduce((sum, account) => sum + account.USDbalance, 0) || 0,
		[accounts],
	);
	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={3}>
					<SummaryCard
						title="Total balance (R$)"
						value={Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(totalBRLBalance)}
						color="info"
						icon={"emojione:flag-for-brazil"}
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<SummaryCard
						title="Total balance (US$)"
						value={Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "USD",
						}).format(totalUSDBalance)}
						color="info"
						icon={"emojione:flag-for-united-states"}
					/>
				</Grid>

				<Grid item xs={12} md={6} lg={6}>
					<PieChart
						title="Wallet Partition"
						chartData={
							walletAssets
								? walletAssets.map((entry) => ({
										label: entry.assetName.value as string,
										value: Number(
											(entry.walletPercentage.value as string).replace("%", ""),
										),
								  }))
								: []
						}
						/* chartData={[
							{ label: "America", value: 4344 },
							{ label: "Asia", value: 5435 },
							{ label: "Europe", value: 1443 },
							{ label: "Africa", value: 4443 },
						]} */
						chartColors={[
							theme.palette.primary.main,
							theme.palette.info.main,
							theme.palette.warning.main,
							theme.palette.error.main,
						]}
					/>
				</Grid>
			</Grid>
			<Card>
				<StandardTable
					title="Wallet"
					headings={headings}
					orderBy={orderBy}
					order={order}
					entries={walletAssets}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					rowsPerPage={rowsPerPage}
					rowsTotal={rowsTotal}
					currentPageIndex={currentPageIndex}
					onSortHandler={createOrderHandler}
					// onFilterClick={() => setOpenFiltersForm(true)}
				/>
			</Card>
		</Container>
	);
};
