import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { createWithdraw } from "../../../api/asset-manager";
import { Account, Currency } from "../../../types";
import { WithdrawForm } from "../../form";

export type AddWithdrawDialogProps = {
	open: boolean;
	accounts?: Account[];
	brokerID: string | null;
	onCancel?: () => void;
	onSuccessResponse?: (brokerID: string) => void;
};
export const AddWithdrawDialog = ({
	open,
	accounts,
	brokerID,
	onCancel,
	onSuccessResponse,
}: AddWithdrawDialogProps) => {
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
		createWithdraw({
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
			<DialogTitle>New Withdraw</DialogTitle>
			<DialogContent>
				<WithdrawForm
					id="add-withdraw"
					accounts={accounts}
					brokerID={brokerID}
					onSubmit={handleSubmit}
				/>
			</DialogContent>
			{!loading ? (
				<DialogActions>
					<Button onClick={onCancel}>Cancel</Button>
					<Button form="add-withdraw" type="submit">
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
