import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { MouseEventHandler } from "react";

type AddFiltersDialogProps = {
	formID: string;
	open: boolean;
	children?: JSX.Element[] | JSX.Element | string;
	onCancel?: () => void;
};
export const AddFiltersDialog = ({
	formID,
	open,
	children,
	onCancel,
}: AddFiltersDialogProps) => {
	const handleOnSubmit: MouseEventHandler<HTMLButtonElement> = () => {
		if (onCancel) onCancel();
	};
	return (
		<Dialog open={open} onClose={onCancel} fullWidth>
			<DialogTitle>Filters</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Button onClick={onCancel}>Cancel</Button>
				<Button type="submit" form={formID} onClick={handleOnSubmit}>
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
};
