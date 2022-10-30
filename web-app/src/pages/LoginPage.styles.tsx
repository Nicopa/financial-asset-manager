import {
	Box,
	Container,
	ContainerProps,
	Paper,
	Typography,
	TypographyProps,
	styled,
} from "@mui/material";

export const StyledPaper = styled(Paper)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	width: "100%",
	maxWidth: 480,
	margin: "16px 0 16px 16px",
});
export const StyledTitle = styled((props: TypographyProps) => (
	<Typography variant="h2" {...props} />
))({
	textAlign: "center",
	marginBottom: 18,
});
export const StyledLogoBox = styled(Box)({
	width: "100%",
	height: "100%",
	img: {
		margin: "0 auto",
		maxHeight: 360,
	},
});
export const StyledContainer = styled((props: ContainerProps) => (
	<Container component="main" {...props} />
))(({ theme }) => ({
	padding: "0 16px",
	marginTop: 16,
	[theme.breakpoints.up("sm")]: {
		maxWidth: "600px",
		padding: "0 24px",
	},
}));
