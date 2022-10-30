import { IconButton, IconButtonProps, styled } from "@mui/material";
import { MenuPopover, MenuPopoverProps } from "../MenuPopover/MenuPopover";

export const StyledIconButton = styled(
	({
		forwardRef,
		...props
	}: IconButtonProps & {
		forwardRef?:
			| ((instance: HTMLButtonElement | null) => void)
			| React.RefObject<HTMLButtonElement>
			| null;
	}) => <IconButton ref={forwardRef} {...props} />
)({
	width: 40,
	height: 40,
});

export const StyledMenuPopover = styled((props: MenuPopoverProps) => (
	<MenuPopover {...props} />
))({
	width: 360,
	p: 0,
	mt: 1.5,
	ml: 0.75,
});
