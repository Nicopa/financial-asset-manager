import {
	Alert,
	Avatar,
	Box,
	Button,
	CircularProgress,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Iconify } from "../../data-display/Iconify";
import { CPFField } from "../../inputs/CPFField/CPFField";
import { useForm } from "../../../hooks/useForm";
import { useFormField, validationRules } from "../../../hooks/useFormField";
import { StyledRoot } from "./SignUp.styles";
export type SignUpData = {
	username: string;
	fullname: string;
	password: string;
	cpf: string;
};
type Props = {
	onSubmit: (data: SignUpData) => Promise<void>;
};
export const SignUp = ({ onSubmit }: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] =
		useState<JSX.Element | string | null>(null);
	const [successMessage, setSuccessMessage] =
		useState<JSX.Element | string | null>(null);
	const { fields } = useForm([
		{
			name: "username",
			validations: [
				{ rule: validationRules.required, message: "This field is required." },
				{
					rule: validationRules.minLength,
					message:
						"Your fullname must have, at least, {{minLength}} characters.",
					attributes: { minLength: 4 },
				},
				{
					rule: validationRules.username,
					message:
						"Your username can only have letters, numbers and/or a special character (!@#$%&*-_.+=)",
				},
			],
		},
		{
			name: "fullname",
			validations: [
				{ rule: validationRules.required, message: "This field is required." },
				{
					rule: validationRules.minLength,
					message:
						"Your fullname must have, at least, {{minLength}} characters.",
					attributes: { minLength: 4 },
				},
			],
		},
		{
			name: "cpf",
			validations: [
				{ rule: validationRules.required, message: "This field is required." },
				{ rule: validationRules.cpf, message: "This CPF is invalid." },
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
				{
					rule: validationRules.password,
					message:
						"Your password must have at least one lowercase letter, one uppercase letter, a number and a special character (!@#$%*)",
				},
			],
		},
	]);
	fields.passwordConfirmation = useFormField({
		name: "passwordConfirmation",
		validations: [
			{ rule: validationRules.required, message: "This field is required." },
			{
				rule: (value: string) => value === fields.password.value,
				message: "Your confirmation password is not the same.",
			},
		],
	});
	const isDisabledSignUpButton = () => {
		for (const field in fields) {
			if (!fields[field].isValid()) return true;
		}
		return false;
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		const data = new FormData(event.currentTarget);
		onSubmit({
			username: data.get("username") as string,
			fullname: data.get("fullname") as string,
			password: data.get("password") as string,
			cpf: data.get("cpf") as string,
		})
			.then(() =>
				setSuccessMessage(
					<Typography>
						Your account was created!{" "}
						<Link to="/login">Click here to sign in.</Link>
					</Typography>,
				),
			)
			.catch((error) => {
				if (error.message) setErrorMessage(error.message as string);
				else setErrorMessage("Something went wrong. Try again later.");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<StyledRoot>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<Iconify icon="eva:lock-outline" />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							name="username"
							label="Username"
							value={fields.username.value}
							inputProps={{
								onChange: fields.username.onChange,
								onBlur: fields.username.onBlur,
							}}
							required
							fullWidth
							error={fields.username.focused && fields.username.showError}
							helperText={
								fields.username.focused && fields.username.showError
									? fields.username.errorMessages.join("\r\n")
									: ""
							}
							autoComplete="username"
							autoFocus
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="fullname"
							label="Fullname"
							value={fields.fullname.value}
							inputProps={{
								onChange: fields.fullname.onChange,
								onBlur: fields.fullname.onBlur,
							}}
							required
							fullWidth
							error={fields.fullname.focused && fields.fullname.showError}
							helperText={
								fields.fullname.focused && fields.fullname.showError
									? fields.fullname.errorMessages.join("\r\n")
									: ""
							}
							autoComplete="fullname"
						/>
					</Grid>
					<Grid item xs={12}>
						<CPFField
							fullWidth
							required
							value={fields.cpf.value}
							onChange={fields.cpf.onChange}
							onBlur={fields.cpf.onBlur}
							error={fields.cpf.focused && fields.cpf.showError}
							helperText={
								fields.cpf.focused && fields.cpf.showError
									? fields.cpf.errorMessages.join("\r\n")
									: ""
							}
						/>
					</Grid>
					<Grid item xs={12}>
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
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="password-confirmation"
							required
							fullWidth
							label="Confirm password"
							type="password"
							value={fields.passwordConfirmation.value}
							inputProps={{
								onChange: fields.passwordConfirmation.onChange,
								onBlur: fields.passwordConfirmation.onBlur,
							}}
							error={
								fields.passwordConfirmation.focused &&
								fields.passwordConfirmation.showError
							}
							helperText={
								fields.passwordConfirmation.focused &&
								fields.passwordConfirmation.showError
									? fields.passwordConfirmation.errorMessages.join("\r\n")
									: ""
							}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={isDisabledSignUpButton()}
				>
					{!loading ? (
						"Sign Up"
					) : (
						<CircularProgress color="inherit" size={20} />
					)}
				</Button>
				{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
				{successMessage && <Alert severity="success">{successMessage}</Alert>}
				<Grid container justifyContent="center">
					<Grid item>
						<Link to="/login">
							<Typography variant="body2">
								Already have an account? Sign in
							</Typography>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</StyledRoot>
	);
};
