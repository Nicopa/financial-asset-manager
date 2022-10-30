import { Card, CardProps, styled } from "@mui/material";

export const StyledCard = styled((props: CardProps) => <Card {...props} />)(
	({ theme }) => ({
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(5),
		textAlign: "center",
		boxShadow: "none",
		maxWidth: theme.breakpoints.values.sm,
	}),
);

export const StyledIconWrapper = styled("div")(({ theme }) => ({
	margin: "auto",
	display: "flex",
	borderRadius: "50%",
	alignItems: "center",
	width: theme.spacing(8),
	height: theme.spacing(8),
	justifyContent: "center",
	marginBottom: theme.spacing(3),
}));
