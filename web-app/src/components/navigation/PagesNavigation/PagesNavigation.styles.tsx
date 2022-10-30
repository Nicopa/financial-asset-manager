import {
	Box,
	BoxProps,
	ListItem,
	ListItemProps,
	ListItemIcon,
	styled,
} from "@mui/material";
import { ElementType } from "react";
import { Iconify } from "../../data-display/Iconify";

export const StyledListItem = styled(
	<C extends ElementType>(props: ListItemProps<C, { component?: C }>) => (
		<ListItem disableGutters {...props} />
	)
)(({ theme }) => ({
	...theme.typography.body2,
	height: 48,
	position: "relative",
	textTransform: "capitalize",
	color: theme.palette.text.secondary,
	borderRadius: theme.shape.borderRadius,
}));

export const StyledListItemIcon = styled(ListItemIcon)({
	width: 22,
	height: 22,
	color: "inherit",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const StyledIconify = styled(Iconify)({
	width: 16,
	height: 16,
	ml: 1,
});

export const StyledBox = styled((props: BoxProps) => (
	<Box component="span" {...props} />
))({
	width: 4,
	height: 4,
	display: "flex",
	borderRadius: "50%",
	alignItems: "center",
	justifyContent: "center",
	bgcolor: "text.disabled",
});
