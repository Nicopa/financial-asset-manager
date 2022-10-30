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
import { createTrading } from "../../../api/asset-manager";
import { Account, Currency } from "../../../types";
import { TradingForm } from "../../form/TradingForm";

type AddTradingDialogProps = {
	open: boolean;
	assets?: {
		id: string;
		name: string;
	}[];
	accounts?: Account[];
	onCancel?: () => void;
	onSuccessResponse?: () => void;
};
export const AddTradingDialog = ({
	open,
	assets,
	accounts,
	onCancel,
	onSuccessResponse,
}: AddTradingDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			brokerID: formData.get("brokerID") as string,
			assetID: formData.get("assetID") as string,
			operation: formData.get("operation") as string,
			operationDate: new Date(formData.get("operationDate") as string),
			settlementDate: new Date(formData.get("settlementDate") as string),
			quantity: parseInt(formData.get("quantity") as string),
			currency: formData.get("currency") as Currency,
			grossTotalAmount: (formData.get("grossTotalAmount") as string).replace(
				",",
				".",
			),
			feeAmount: (formData.get("feeAmount") as string).replace(",", "."),
			brokerageFeeAmount: (
				formData.get("brokerageFeeAmount") as string
			).replace(",", "."),
		};
		createTrading({
			brokerID: data.brokerID,
			assetID: data.assetID,
			operation: data.operation,
			operationDate: data.operationDate,
			settlementDate: data.settlementDate,
			quantity: data.quantity,
			grossTotal: {
				amount: parseFloat(data.grossTotalAmount),
				currency: data.currency,
			},
			fee: data.feeAmount
				? {
						amount: parseFloat(data.feeAmount),
						currency: data.currency,
				  }
				: undefined,
			brokerageFee: data.brokerageFeeAmount
				? {
						amount: parseFloat(data.brokerageFeeAmount),
						currency: data.currency,
				  }
				: undefined,
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
			<DialogTitle>New Trading</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please, fill the form below to insert a new trade.
				</DialogContentText>
				<TradingForm
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
