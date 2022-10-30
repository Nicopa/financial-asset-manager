import { Alert, Container, Snackbar } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getBrokersForAccount } from "../api/asset-manager";
import { AccountCardList } from "../components/data-display/AccountCard";
import { AddAccountDialog } from "../components/feedback/AddAccountDialog/AddAccountDialog";
import { AddDepositDialog } from "../components/feedback/AddDepositDialog";
import { AddWithdrawDialog } from "../components/feedback/AddWithdrawDialog";
import { useAccounts } from "../hooks/useAccounts";
import { Broker } from "../types";

export const AccountsPage = () => {
	//accounts
	const { accounts, loadAccounts } = useAccounts();
	//brokers
	const [brokersForAccount, setBrokersForAccount] =
		useState<Broker[] | undefined>(undefined);
	const loadBrokersForAccount = useCallback(
		() => getBrokersForAccount().then((value) => setBrokersForAccount(value)),
		[],
	);
	//dialogs
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [openAddAccountDialog, setOpenAddAccountDialog] =
		useState<boolean>(false);
	const [brokerForDepositOrWithdraw, setBrokerForDepositOrWithdraw] =
		useState<string | null>(null);
	const [addDepositFormProps, setAddDepositFormProps] =
		useState<boolean>(false);
	const [addWithdrawFormProps, setAddWithdrawFormProps] =
		useState<boolean>(false);
	const handleOnCancelAddAccountDialog = () => setOpenAddAccountDialog(false);
	const handleOnMakeDepositClick = (brokerID: string) => {
		setBrokerForDepositOrWithdraw(brokerID);
		setAddDepositFormProps(true);
	};
	const handleOnCancelAddDepositDialog = () => setAddDepositFormProps(false);
	const handleOnMakeWithdrawClick = (brokerID: string) => {
		setBrokerForDepositOrWithdraw(brokerID);
		setAddWithdrawFormProps(true);
	};
	const handleOnCancelAddWithdrawDialog = () => setAddWithdrawFormProps(false);
	const handleAddAccountDialogSuccessResponse = () => {
		loadAccounts();
		loadBrokersForAccount();
		setOpenAddAccountDialog(false);
	};
	const handleAddDepositDialogSuccessResponse = () => {
		setAlertMessage("Deposit created");
		setAddDepositFormProps(false);
		setTimeout(loadAccounts, 1000);
	};
	const handleAddWithdrawDialogSuccessResponse = () => {
		setAlertMessage("Withdraw created");
		setAddWithdrawFormProps(false);
		setTimeout(loadAccounts, 1000);
	};
	useEffect(() => {
		loadBrokersForAccount();
	}, [loadBrokersForAccount]);
	return (
		<Container>
			<AccountCardList
				onMakeDepositClick={handleOnMakeDepositClick}
				onMakeWithdrawClick={handleOnMakeWithdrawClick}
				accounts={accounts}
				addNewAccountButton={!!brokersForAccount?.length}
				onNewCardClick={() => setOpenAddAccountDialog(true)}
			/>
			<AddAccountDialog
				open={openAddAccountDialog}
				brokers={brokersForAccount}
				onCancel={handleOnCancelAddAccountDialog}
				onSuccessResponse={handleAddAccountDialogSuccessResponse}
			/>
			<AddDepositDialog
				open={addDepositFormProps}
				accounts={accounts}
				brokerID={brokerForDepositOrWithdraw}
				onCancel={handleOnCancelAddDepositDialog}
				onSuccessResponse={handleAddDepositDialogSuccessResponse}
			/>
			<AddWithdrawDialog
				open={addWithdrawFormProps}
				accounts={accounts}
				brokerID={brokerForDepositOrWithdraw}
				onCancel={handleOnCancelAddWithdrawDialog}
				onSuccessResponse={handleAddWithdrawDialogSuccessResponse}
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
