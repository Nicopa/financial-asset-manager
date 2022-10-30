import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { createEarning } from "../../../api/asset-manager";
import { Account, Currency } from "../../../types";
import { EarningForm } from "../../form/EarningForm";

type AddEarningDialogProps = {
	open: boolean;
	assets?: {
		id: string;
		name: string;
	}[];
	accounts?: Account[];
	onCancel?: () => void;
	onSuccessResponse?: () => void;
};
export const AddEarningDialog = ({
	open,
	assets,
	accounts,
	onCancel,
	onSuccessResponse,
}: AddEarningDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			brokerID: formData.get("brokerID") as string,
			assetID: formData.get("assetID") as string,
			operationDate: new Date(formData.get("operationDate") as string),
			settlementDate: new Date(formData.get("settlementDate") as string),
			currency: formData.get("currency") as Currency,
			valueAmount: (formData.get("valueAmount") as string).replace(",", "."),
			type: formData.get("type") as string,
			quantity: parseInt(formData.get("quantity") as string),
		};
		createEarning({
			brokerID: data.brokerID,
			value: {
				amount: parseFloat(data.valueAmount),
				currency: data.currency,
			},
			operationDate: data.operationDate,
			settlementDate: data.settlementDate,
			assetID: data.assetID,
			type: data.type,
			quantity: data.quantity,
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
			<DialogTitle>New Earning</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please, fill the form below to insert a new trade.
				</DialogContentText>
				<EarningForm
					id="add-trading"
					assets={assets}
					accounts={accounts}
					onSubmit={handleSubmit}
				/>
			</DialogContent>
			{!loading ? (
				<DialogActions>
					<Button onClick={onCancel}>Cancel</Button>
					<Button form="add-trading" type="submit">
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
