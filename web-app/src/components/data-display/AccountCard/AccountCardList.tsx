import { Box, Grid, Typography } from "@mui/material";
import { MouseEventHandler } from "react";
import { Account } from "../../../types";
import { AccountCard } from "./AccountCard";

export type AccountCardListProps = {
	accounts?: Account[];
	onMakeDepositClick?: (brokerID: string) => void;
	onMakeWithdrawClick?: (brokerID: string) => void;
	addNewAccountButton?: boolean;
	onNewCardClick?: MouseEventHandler<HTMLDivElement>;
};
export const AccountCardList = ({
	accounts,
	onMakeDepositClick,
	onMakeWithdrawClick,
	addNewAccountButton,
	onNewCardClick,
}: AccountCardListProps) => {
	if (!accounts)
		return (
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={4}>
					<AccountCard />
				</Grid>
			</Grid>
		);
	return (
		<>
			{accounts && !accounts.length && (
				<Box sx={{ textAlign: "center" }}>
					<Typography variant="body1">You have no accounts</Typography>
				</Box>
			)}
			<Grid container spacing={3}>
				{accounts.map((account, index) => (
					<Grid key={index} item xs={12} sm={6} md={4}>
						<AccountCard
							account={account}
							onMakeDepositClick={onMakeDepositClick}
							onMakeWithdrawClick={onMakeWithdrawClick}
						/>
					</Grid>
				))}
				{addNewAccountButton && (
					<Grid item xs={12} sm={6} md={4}>
						<AccountCard variant="new" onNewCardClick={onNewCardClick} />
					</Grid>
				)}
			</Grid>
		</>
	);
};
