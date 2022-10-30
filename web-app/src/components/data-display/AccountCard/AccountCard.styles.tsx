import { Card, IconButton, IconButtonProps, styled } from "@mui/material";

export const StyledCard = styled(Card)({
	width: "100%",
	maxWidth: 350,
});
export const StyledAccountImage = styled("img")({
	top: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	position: "absolute",
});
export const StyledIconButton = styled((args: IconButtonProps) => (
	<IconButton {...args} />
))(({ theme }) => ({
	marginTop: -40,
	backgroundColor: theme.palette.background.paper,
}));
