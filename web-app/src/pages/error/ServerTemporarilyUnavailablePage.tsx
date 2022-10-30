import { Container, Typography } from "@mui/material";
import { StyledContent } from "./ServerTemporarilyUnavailable.styles";

export const ServerTemporarilyUnavailablePage = () => {
	return (
		<Container component="main">
			<StyledContent>
				<Typography variant="h2" paragraph>
					Server temporarily unavailable...
				</Typography>
				<Typography sx={{ color: "text.secondary" }}>
					Sorry, something went wrong with our server. Please, try again later.
				</Typography>
			</StyledContent>
		</Container>
	);
};
