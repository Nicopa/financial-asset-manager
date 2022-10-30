import { Stack } from "@mui/material";
// import illustrationImage from "../assets/illustration_login.png";
import illustrationImage from "../assets/illustration_login2.webp";
import { Login } from "../components/compound/login/Login";
import {
	StyledContainer,
	StyledLogoBox,
	StyledPaper,
	StyledTitle,
} from "./LoginPage.styles";

export const LoginPage = () => {
	return (
		<>
			<Stack direction="row">
				<StyledPaper>
					<StyledTitle>Hi, Welcome Back</StyledTitle>
					<StyledLogoBox>
						<img src={illustrationImage} alt="Login" />
					</StyledLogoBox>
				</StyledPaper>
				<StyledContainer>
					<Login />
				</StyledContainer>
			</Stack>
		</>
	);
};
