import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { createAccount } from "../../../api/asset-manager";
import { Broker } from "../../../types";
import { AccountForm } from "../../form";

export type AddAccountDialogProps = {
	open: boolean;
	brokers?: Broker[];
	onCancel?: () => void;
	onSuccessResponse?: () => void;
};
export const AddAccountDialog = ({
	open,
	brokers,
	onCancel,
	onSuccessResponse,
}: AddAccountDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		createAccount({
			brokerID: formData.get("broker") as string,
		})
			.then((response) => {
				if (response.isSuccess && onSuccessResponse) onSuccessResponse();
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>New Account</DialogTitle>
			<DialogContent>
				<AccountForm
					id="add-account"
					brokers={brokers}
					onSubmit={handleSubmit}
				/>
			</DialogContent>
			{!loading ? (
				<DialogActions>
					<Button onClick={onCancel}>Cancel</Button>
					<Button form="add-account" type="submit">
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
