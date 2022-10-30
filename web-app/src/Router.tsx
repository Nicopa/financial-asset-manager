import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layout/DashboardLayout";
import { LoginLayout } from "./layout/LoginLayout/LoginLayout";
import { ServerErrorLayout } from "./layout/ServerErrorLayout/ServerErrorLayout";
import { AuthProvider, RequireAuth } from "./hooks/useAuth";
import {
	AccountsPage,
	CashFlowPage,
	EarningsPage,
	LoginPage,
	SignUpPage,
	TradingsPage,
} from "./pages";
import { ServerTemporarilyUnavailablePage } from "./pages/error";
import { WalletPage } from "./pages/WalletPage";

export const Router = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<ServerErrorLayout />}>
					<Route
						path="/server-temporarily-unavailable"
						element={<ServerTemporarilyUnavailablePage />}
					/>
				</Route>
				<Route element={<LoginLayout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
				</Route>
				<Route
					element={
						<RequireAuth>
							<DashboardLayout />
						</RequireAuth>
					}
				>
					<Route path="/" element={<WalletPage />} />
					<Route path="/tradings" element={<TradingsPage />} />
					<Route path="/cash-flow" element={<CashFlowPage />} />
					<Route path="/accounts" element={<AccountsPage />} />
					<Route path="/wallet" element={<WalletPage />} />
					<Route path="/earnings" element={<EarningsPage />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
};
