import { Box } from "@mui/material";
import { Icon, IconifyIcon } from "@iconify/react";

export type IconifyProps = {
	icon: string | IconifyIcon;
	sx?: object;
};

export const Iconify = ({ icon, sx, ...otherProps }: IconifyProps) => (
	<Box component={Icon} icon={icon} sx={{ ...sx }} {...otherProps} />
);
