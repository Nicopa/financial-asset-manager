import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { createDeposit } from "../../../api/asset-manager";
import { Account, Currency } from "../../../types";
import { DepositForm } from "../../form";

export type AddDepositDialogProps = {
	open: boolean;
	accounts?: Account[];
	brokerID: string | null;
	onCancel?: () => void;
	onSuccessResponse?: (brokerID: string) => void;
};
export const AddDepositDialog = ({
	open,
	accounts,
	brokerID,
	onCancel,
	onSuccessResponse,
}: AddDepositDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			brokerID: formData.get("brokerID") as string,
			amount: formData.get("amount") as string,
			currency: formData.get("currency") as Currency,
			date: formData.get("date") as string,
		};
		createDeposit({
			brokerID: data.brokerID,
			value: {
				amount: parseFloat(data.amount.replace(",", ".")),
				currency: data.currency,
			},
			date: new Date(data.date),
		})
			.then((response) => {
				if (response.isSuccess && onSuccessResponse)
					onSuccessResponse(data.brokerID);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>New Deposit</DialogTitle>
			<DialogContent>
				<DepositForm
					id="add-deposit"
					accounts={accounts}
					brokerID={brokerID}
					onSubmit={handleSubmit}
				/>
			</DialogContent>
			{!loading ? (
				<DialogActions>
					<Button onClick={onCancel}>Cancel</Button>
					<Button form="add-deposit" type="submit">
						Add
					</Button>
				</DialogActions>
			) : (
				<DialogActions sx={{ justifyContent: "center" }}>
					<CircularProgress size={28} sx={{ m: 1 }} />
				</DialogActions>
			)}
		</Dialog>
	);
};
