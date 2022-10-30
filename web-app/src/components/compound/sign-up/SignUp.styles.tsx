import { Box, styled } from "@mui/material";

export const StyledRoot = styled(Box)(({ theme }) => ({
	marginTop: 8,
	mx: "auto",
	paddingBottom: 24,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	maxWidth: theme.breakpoints.values.sm,
}));
