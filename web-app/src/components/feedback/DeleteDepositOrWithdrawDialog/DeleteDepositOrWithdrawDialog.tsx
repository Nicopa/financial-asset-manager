import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { deleteDeposit } from "../../../api/asset-manager";

export type DeleteDepositOrWithdrawDialogProps = {
	data?: {
		id: string;
		operationDate: Date;
		settlementDate: Date;
		brokerCompanyName: string;
		operation: string | JSX.Element;
		value: string;
	};
	onCancel?: () => void;
	onSuccessResponse?: () => void;
};
export const DeleteDepositOrWithdrawDialog = ({
	data,
	onCancel,
	onSuccessResponse,
}: DeleteDepositOrWithdrawDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
		setLoading(true);
		deleteDeposit(data!.id)
			.then((status) => {
				if (status >= 200 && status < 300 && onSuccessResponse)
					onSuccessResponse();
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Dialog open={!!data} onClose={onCancel}>
			<DialogTitle>Are you sure to delete this record?</DialogTitle>
			<DialogContent>
				{data && (
					<>
						<Box>
							<Typography variant="body1">
								Operation date: {data.operationDate.toLocaleDateString()}
							</Typography>
						</Box>
						<Box>
							<Typography variant="body1">
								Settlement date: {data.settlementDate.toLocaleDateString()}
							</Typography>
						</Box>
						<Box>
							<Typography variant="body1">Value: {data.value}</Typography>
						</Box>
					</>
				)}
			</DialogContent>
			{!loading ? (
				<DialogActions>
					<Button onClick={onCancel}>Cancel</Button>
					<Button onClick={handleSubmit}>Delete</Button>
				</DialogActions>
			) : (
				<DialogActions sx={{ justifyContent: "center" }}>
					<CircularProgress size={28} sx={{ m: 1 }} />
				</DialogActions>
			)}
		</Dialog>
	);
};
