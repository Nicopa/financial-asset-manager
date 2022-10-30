import { Box, styled } from "@mui/material";

export const StyledRoot = styled(Box)(({ theme }) => ({
	marginTop: 8,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "100%",
	maxWidth: theme.breakpoints.values.sm,
}));
