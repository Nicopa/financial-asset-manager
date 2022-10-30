import { Drawer, DrawerProps, styled } from "@mui/material";

const DRAWER_WIDTH = 280;

export const StyledDrawer = styled((props: DrawerProps) => (
	<Drawer {...props} />
))(({ theme }) => ({
	[theme.breakpoints.up("lg")]: {
		flexShrink: 0,
		width: DRAWER_WIDTH,
	},
	width: "100%",
	"& .MuiDrawer-paper": {
		width: DRAWER_WIDTH,
		boxSizing: "border-box",
	},
}));

export const StyledAccount = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: theme.palette.grey[300],
}));
