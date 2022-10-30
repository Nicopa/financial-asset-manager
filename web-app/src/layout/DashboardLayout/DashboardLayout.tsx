import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DashboardNavigationBar } from "../DashboardNavigationBar";
import { DashboardSidebar } from "../../components/navigation/DashboardSidebar";
import { StyledRoot, StyledMain } from "./DashboardLayout.styles";

export const DashboardLayout = () => {
	const [open, setOpen] = useState(false);
	const { user } = useAuth();
	return (
		<StyledRoot>
			<DashboardNavigationBar
				username={user!.username}
				onOpenSidebar={() => setOpen(true)}
			/>
			<DashboardSidebar
				user={{ fullname: user?.fullname, cpf: user?.cpf }}
				isOpenSidebar={open}
				onCloseSidebar={() => setOpen(false)}
			/>
			<StyledMain>
				<Outlet />
			</StyledMain>
		</StyledRoot>
	);
};
