import { Box } from "@mui/material";
import { LoginLayoutHeader } from "../LoginLayoutHeader/LoginLayoutHeader";
import { ReactComponent as SVGLogo } from "../../assets/star-logo2.svg";
import { Outlet } from "react-router-dom";

export const LoginLayout = () => {
	return (
		<>
			<LoginLayoutHeader>
				<Box>
					<SVGLogo width={40} height={40} />
				</Box>
			</LoginLayoutHeader>
			<Outlet />
		</>
	);
};
