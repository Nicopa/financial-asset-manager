import { Popover, SxProps, Theme } from "@mui/material";
import { StyledSpan } from "./MenuPopover.styles";

export type MenuPopoverProps = {
	anchorEl?: Element | ((element: Element) => Element) | null;
	children: JSX.Element | JSX.Element[];
	onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
	open: boolean;
	sx?: SxProps<Theme>;
};

export const MenuPopover = ({
	anchorEl,
	children,
	onClose,
	open,
	sx,
}: MenuPopoverProps) => {
	return (
		<Popover open={open} onClose={onClose} anchorEl={anchorEl} sx={sx}>
			<StyledSpan />
			{children}
		</Popover>
	);
};
