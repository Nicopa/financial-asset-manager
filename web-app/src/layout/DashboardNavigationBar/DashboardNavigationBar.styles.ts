import { alpha, AppBar, Stack, styled, Toolbar } from "@mui/material";

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

export const StyledRoot = styled(AppBar)(({ theme }) => ({
	boxShadow: "none",
	backdropFilter: "blur(6px)",
	WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
	backgroundColor: alpha(theme.palette.background.default, 0.72),
	[theme.breakpoints.up("lg")]: {
		width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
	},
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	minHeight: APPBAR_MOBILE,
	[theme.breakpoints.up("lg")]: {
		minHeight: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}));

export const StyledStack = styled(Stack)({
	flexDirection: "row",
	alignItems: "center",
	spacing: {
		xs: 0.5,
		sm: 1.5,
	},
});
