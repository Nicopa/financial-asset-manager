import { Box, Link, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { PagesNavigation } from "../PagesNavigation/PagesNavigation";
import { ReactComponent as SVGLogo } from "../../../assets/star-logo2.svg";
import { StyledAccount, StyledDrawer } from "./DashboardSidebar.styles";
import useResponsive from "../../../hooks/useResponsive";

type Props = {
	user?: {
		fullname?: string;
		cpf?: string;
	};
	isOpenSidebar?: boolean;
	onCloseSidebar?: (
		event: {},
		reason: "backdropClick" | "escapeKeyDown",
	) => void;
};

export const DashboardSidebar = ({
	user,
	isOpenSidebar,
	onCloseSidebar,
}: Props) => {
	const { pathname } = useLocation();
	const isDesktop = useResponsive("up", "md");
	useEffect(() => {
		if (isOpenSidebar && onCloseSidebar) onCloseSidebar({}, "backdropClick");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);
	const renderContent = (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ mx: 2, my: 2 }}>
				<SVGLogo width={40} height={40} />
			</Box>
			<Box sx={{ mx: 1, my: 2 }}>
				<Link underline="none" component={RouterLink} to="#">
					<StyledAccount>
						<Box>
							<Typography variant="subtitle2">
								{user && user.fullname}
							</Typography>
							<Typography variant="body2">{user && user.cpf}</Typography>
						</Box>
					</StyledAccount>
				</Link>
			</Box>
			<PagesNavigation />
			<Box sx={{ flexGrow: 1 }} />
		</Box>
	);
	if (isDesktop)
		return (
			<StyledDrawer open variant="permanent">
				{renderContent}
			</StyledDrawer>
		);
	return (
		<StyledDrawer open={isOpenSidebar} onClose={onCloseSidebar}>
			{renderContent}
		</StyledDrawer>
	);
};
