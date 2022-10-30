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
import { deleteEarning } from "../../../api/asset-manager";
import { Earning } from "../../../types";

export type DeleteEarningDialogProps = {
	data?: Earning;
	onCancel?: () => void;
	onSuccessResponse?: () => void;
};
export const DeleteEarningDialog = ({
	data,
	onCancel,
	onSuccessResponse,
}: DeleteEarningDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
		setLoading(true);
		deleteEarning(data!.id)
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
							<Typography variant="body1">Asset: {data.assetName}</Typography>
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
							<Typography variant="body1">
								value:{" "}
								{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: data.valueCurrency,
								}).format(data.valueAmount)}
							</Typography>
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
