import { Container, Grid, useTheme } from "@mui/material";
import { useMemo } from "react";
import { BalanceChart } from "../components/data-display/BalanceChart/BalanceChart";
import { SummaryCard } from "../components/data-display/SummaryCard/SummaryCard";
import { YieldChart } from "../components/data-display/YieldChart/YieldChart";
import { useAccounts } from "../hooks/useAccounts";

export const DashboardPage = () => {
	// const theme = useTheme();
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

				{/* <Grid item xs={12} sm={6} md={3}>
					<SummaryCard
						title="Item Orders"
						value={1723315}
						color="warning"
						icon={"ant-design:windows-filled"}
					/>
				</Grid> */}

				{/* <Grid item xs={12} sm={6} md={3}>
					<SummaryCard
						title="Bug Reports"
						value={234}
						color="error"
						icon={"ant-design:bug-filled"}
					/>
				</Grid> */}

				<Grid item xs={12} md={6} lg={8}>
					<YieldChart
						title="Website Visits"
						// subheader="(+43%) than last year"
						chartLabels={[
							"01/01/2003",
							"02/01/2003",
							"03/01/2003",
							"04/01/2003",
							"05/01/2003",
							"06/01/2003",
							"07/01/2003",
							"08/01/2003",
							"09/01/2003",
							"10/01/2003",
							"11/01/2003",
						]}
						chartData={[
							{
								name: "Team A",
								type: "column",
								fill: "solid",
								data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
							},
							{
								name: "Team B",
								type: "area",
								fill: "gradient",
								data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
							},
							{
								name: "Team C",
								type: "line",
								fill: "solid",
								data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
							},
						]}
					/>
				</Grid>
				{/* <Grid item xs={12} md={6} lg={4}>
					<BalanceChart
						title="Current Subject"
						chartLabels={[
							"English",
							"History",
							"Physics",
							"Geography",
							"Chinese",
							"Math",
						]}
						chartData={[
							{ name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
							{ name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
							{ name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
						]}
						chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
					/>
				</Grid> */}
			</Grid>
		</Container>
	);
};
