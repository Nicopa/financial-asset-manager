import { useState, useRef } from "react";
import { IconButton, Menu, PopoverOrigin } from "@mui/material";
import { Iconify } from "../../data-display/Iconify";

export type MoreMenuProps = {
	anchorOrigin?: PopoverOrigin | undefined;
	transformOrigin?: PopoverOrigin | undefined;
	children?: JSX.Element | JSX.Element[];
};
export const MoreMenu = ({
	anchorOrigin,
	transformOrigin,
	children,
}: MoreMenuProps) => {
	const ref = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<IconButton
				aria-label="More options"
				onClick={() => setIsOpen(true)}
				ref={ref}
			>
				<Iconify icon="eva:more-vertical-fill" />
			</IconButton>
			<Menu
				open={isOpen}
				onClose={() => setIsOpen(false)}
				anchorEl={ref.current}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
			>
				{children}
			</Menu>
		</>
	);
};
