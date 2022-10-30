import { Box, IconButton } from "@mui/material";
import { MouseEventHandler } from "react";
import { Iconify } from "../../components/data-display/Iconify";
import { AccountPopover } from "../../components/navigation/AccountPopover";
import { LanguagePopover } from "../../components/navigation/LanguagePopover/LanguagePopover";
import { NotificationsPopover } from "../../components/navigation/NotificationsPopover/NotificationsPopover";
import {
	StyledRoot,
	StyledToolbar,
	StyledStack,
} from "./DashboardNavigationBar.styles";

type Props = {
	username: string;
	onOpenSidebar?: MouseEventHandler<HTMLButtonElement>;
};

export const DashboardNavigationBar = ({ username, onOpenSidebar }: Props) => {
	return (
		<StyledRoot>
			<StyledToolbar>
				<IconButton onClick={onOpenSidebar}>
					<Iconify icon="eva:menu-2-fill" />
				</IconButton>
				<Box sx={{ flexGrow: 1 }}></Box>
				<StyledStack>
					<LanguagePopover />
					{/* <NotificationsPopover /> */}
					<AccountPopover username={username} />
				</StyledStack>
			</StyledToolbar>
		</StyledRoot>
	);
};
