import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getAuthToken, getUserData } from "../api/asset-manager";
import { Credentials } from "../types";

type User = {
	username: string;
	fullname: string;
	cpf?: string;
};

export type LoginResponse = { isSuccess: boolean; message?: string };
const AuthContext = createContext<{
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	login: (
		credentials: Credentials,
		callback: (response: LoginResponse) => void,
	) => Promise<void>;
	logout: (callback: VoidFunction) => void;
}>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const login = async (
		credentials: Credentials,
		callback: (response: LoginResponse) => void,
	) => {
		try {
			const response = await getAuthToken(credentials);
			if (response.isSuccess) {
				const { token, username, fullname, cpf } = response.data;
				localStorage.setItem("auth_token", token);
				setUser({ username, fullname, cpf });
				callback({ isSuccess: true });
			}
			if (
				response.data.code === "USERNAME_NOT_FOUND" ||
				response.data.code === "INCORRECT_PASSWORD"
			)
				callback({ isSuccess: false, message: response.data.message });
		} catch (error) {
			callback({
				isSuccess: false,
				message: "Something went wrong. Please, try again later.",
			});
			console.error(error);
		}
	};
	const logout = (callback: VoidFunction) => {
		setUser(null);
		localStorage.removeItem("auth_token");
		callback();
	};
	return (
		<AuthContext.Provider value={{ user, setUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const auth = useAuth();
	const location = useLocation();
	const [error, setError] = useState<Error | null>(null);

	if (error) return <Navigate to={"/server-temporarily-unavailable"} />;
	if (!auth.user) {
		const token = localStorage.getItem("auth_token");
		if (!token)
			return <Navigate to={"/login"} state={{ from: location }} replace />;
		getUserData()
			.then((response) => {
				if (response.isSuccess)
					return auth.setUser({
						username: response.data.username,
						fullname: response.data.fullname,
						cpf: response.data.cpf,
					});
				if (
					response.data.code === "EXPIRED_TOKEN" ||
					response.data.code === "INVESTOR_ID_NOT_FOUND"
				) {
					setError(response.data);
					return localStorage.removeItem("auth_token");
				}
				console.error(response.data);
			})
			.catch(async (error) => {
				setError(error);
			});
		return (
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={true}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}
	return children;
};
