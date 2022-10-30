import {
	Box,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Account } from "../../../types";
import { MoreMenu } from "../../navigation/MoreMenu";
import { Iconify } from "../Iconify";
import {
	StyledAccountImage,
	StyledCard,
	StyledIconButton,
} from "./AccountCard.styles";

export type AccountCardProps = {
	variant?: "card" | "new";
	account?: Account;
	onMakeDepositClick?: (brokerID: string) => void;
	onMakeWithdrawClick?: (brokerID: string) => void;
	onNewCardClick?: MouseEventHandler<HTMLDivElement>;
};
export const AccountCard = ({
	variant,
	account,
	onMakeDepositClick,
	onMakeWithdrawClick,
	onNewCardClick,
}: AccountCardProps) => {
	if (variant && variant === "new")
		return (
			<StyledCard onClick={onNewCardClick} sx={{ cursor: "pointer" }}>
				<Skeleton variant="rectangular" width="100%" animation={false}>
					<Box sx={{ pt: "80%", position: "relative" }}></Box>
				</Skeleton>
				<Box sx={{ m: 2.5, textAlign: "center" }}>
					<StyledIconButton aria-label="New account" disableRipple>
						<Iconify
							icon="eva:plus-circle-outline"
							sx={{ width: 48, height: 48 }}
						/>
					</StyledIconButton>
					<Typography variant="h4" component="div" noWrap>
						New account
					</Typography>
				</Box>
			</StyledCard>
		);
	if (!account)
		return (
			<StyledCard>
				<Skeleton variant="rectangular" width="100%">
					<Box sx={{ pt: "80%", position: "relative" }}></Box>
				</Skeleton>
				<Stack
					spacing={2}
					sx={{ m: 2.5 }}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box>
						<Typography variant="subtitle2" component="span" noWrap>
							<Skeleton variant="text" width={100} />
						</Typography>
					</Box>
					<Box sx={{ display: "inline-block" }}>
						<Skeleton
							variant="circular"
							width={28}
							height={28}
							sx={{ display: "inline-block" }}
						/>
						<Skeleton
							variant="circular"
							width={28}
							height={28}
							sx={{ display: "inline-block" }}
						/>
						<Skeleton
							variant="circular"
							width={28}
							height={28}
							sx={{ display: "inline-block" }}
						/>
						<Skeleton
							variant="circular"
							width={24}
							height={24}
							sx={{ display: "inline-block" }}
						/>
					</Box>
				</Stack>
				<Box sx={{ mx: 2.5, my: 2 }}>
					<Typography
						sx={{ my: 1 }}
						variant="subtitle2"
						component="span"
						noWrap
					>
						<Skeleton variant="text" />
					</Typography>
				</Box>
			</StyledCard>
		);
	return (
		<StyledCard>
			<Box sx={{ pt: "80%", position: "relative" }}>
				<StyledAccountImage alt="Account image" src={account.thumbnail} />
			</Box>
			<Stack
				spacing={1}
				sx={{ m: 2 }}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography variant="subtitle2" component="span" noWrap>
					{account.tradingName}
				</Typography>

				<Box sx={{ display: "inline-block", textAlign: "right" }}>
					<Link
						to={`/cash-flow?brokerID=${account.brokerID}`}
						color="inherit"
						underline="hover"
						component={RouterLink}
					>
						<IconButton aria-label="See cash flow">
							<Iconify icon="eva:flip-outline" />
						</IconButton>
					</Link>

					<IconButton
						aria-label="Make deposit"
						onClick={
							onMakeDepositClick
								? () => onMakeDepositClick(account.brokerID)
								: undefined
						}
					>
						<Iconify icon="mdi:cash-plus" />
					</IconButton>

					<IconButton
						aria-label="Make withdraw"
						onClick={
							onMakeWithdrawClick
								? () => onMakeWithdrawClick(account.brokerID)
								: undefined
						}
					>
						<Iconify icon="mdi:cash-minus" />
					</IconButton>

					<MoreMenu
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
						transformOrigin={{ vertical: "top", horizontal: "right" }}
					>
						<MenuItem>
							<ListItemIcon>
								<Iconify icon="eva:trash-2-outline" />
							</ListItemIcon>
							<ListItemText primary="Delete account" />
						</MenuItem>
					</MoreMenu>
				</Box>
			</Stack>
			<Stack
				spacing={2}
				sx={{ mx: 2, mt: 1, mb: 2 }}
				direction="row"
				justifyContent="space-between"
				alignItems="top"
			>
				<Typography sx={{ my: 1 }} variant="subtitle2" component="span" noWrap>
					Balance
				</Typography>
				<List dense>
					<ListItem sx={{ py: 0 }}>
						<ListItemText
							primary={new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(account.BRLbalance)}
							sx={{ textAlign: "right" }}
						/>
					</ListItem>
					<ListItem sx={{ py: 0 }}>
						<ListItemText
							primary={new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "USD",
							}).format(account.USDbalance)}
							sx={{ textAlign: "right" }}
						/>
					</ListItem>
				</List>
			</Stack>
		</StyledCard>
	);
};
