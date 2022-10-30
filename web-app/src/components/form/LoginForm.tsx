import {
	Avatar,
	Box,
	Typography,
	Button,
	Grid,
	TextField,
	CircularProgress,
	Alert,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginResponse, useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { validationRules } from "../../hooks/useFormField";
import { Iconify } from "../data-display/Iconify";
import { StyledRoot } from "./LoginForm.styles";

export const LoginForm = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { fields, isValid: formIsValid } = useForm([
		{
			name: "username",
			validations: [
				{ rule: validationRules.required, message: "This field is required." },
				{
					rule: validationRules.minLength,
					message: "Username should have at least 2 characters length.",
					attributes: { minLength: 2 },
				},
			],
		},
		{
			name: "password",
			validations: [
				{ rule: validationRules.required, message: "This field is required." },
				{
					rule: validationRules.minLength,
					message:
						"Your password must have, at least, {{minLength}} characters.",
					attributes: { minLength: 8 },
				},
			],
		},
	]);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		auth.login(
			{
				username: formData.get("username") as string,
				password: formData.get("password") as string,
			},
			(response: LoginResponse) => {
				if (response.isSuccess) return navigate("/", { replace: true });
				if (response.message) setErrorMessage(response.message);
				setLoading(false);
			},
		);
	};
	return (
		<StyledRoot>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<Iconify icon="eva:lock-outline" />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Alert severity="info" sx={{ width: "100%" }}>
				<i>You can sign in with this demo user</i>
				<br />
				<i>Username:</i> <span style={{ fontWeight: "bold" }}>testinguser</span>
				<br />
				<i>Password:</i> <span style={{ fontWeight: "bold" }}>Test!123</span>
			</Alert>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{ width: "100%", mt: 1 }}
			>
				<TextField
					name="username"
					label="Username"
					value={fields.username.value}
					required
					fullWidth
					inputProps={{
						onChange: fields.username.onChange,
						onBlur: fields.username.onBlur,
					}}
					error={fields.username.focused && fields.username.showError}
					helperText={
						fields.username.focused && fields.username.showError
							? fields.username.errorMessages.join("\r\n")
							: ""
					}
					margin="normal"
				/>
				<TextField
					name="password"
					label="Password"
					type="password"
					value={fields.password.value}
					required
					fullWidth
					inputProps={{
						onChange: fields.password.onChange,
						onBlur: fields.password.onBlur,
					}}
					error={fields.password.focused && fields.password.showError}
					helperText={
						fields.password.focused && fields.password.showError
							? fields.password.errorMessages.join("\r\n")
							: ""
					}
				/>
				<Grid container>
					<Grid item>
						<Link to="/signup">
							<Typography variant="body2">
								{"Don't have an account? Sign Up"}
							</Typography>
						</Link>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={!formIsValid()}
				>
					{!loading ? (
						"Sign In"
					) : (
						<CircularProgress color="inherit" size={20} />
					)}
				</Button>
				{errorMessage && (
					<Box>
						<Typography variant="body1" color="error">
							{errorMessage}
						</Typography>
					</Box>
				)}
			</Box>
		</StyledRoot>
	);
};
