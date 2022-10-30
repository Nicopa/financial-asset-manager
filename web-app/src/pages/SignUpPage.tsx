import { Container } from "@mui/material";
import { requestSignUp } from "../api/asset-manager";
import { SignUp, SignUpData } from "../components/compound/sign-up";

export const SignUpPage = () => {
	const handleSubmit = async (data: SignUpData): Promise<void> => {
		const response = await requestSignUp(data);
		if (!response.isSuccess) throw new Error("Error trying to sign up.");
	};
	return (
		<Container component="main" maxWidth="xs" sx={{ paddingBottom: 3 }}>
			<SignUp onSubmit={handleSubmit} />
		</Container>
	);
};
