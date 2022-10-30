import {
	alpha,
	Box,
	Collapse,
	List,
	ListItemText,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import {
	NavLink as RouterLink,
	matchPath,
	useLocation,
} from "react-router-dom";
import { navigationConfig, NavigationConfigItem } from "../../../config";
import { Iconify } from "../../data-display/Iconify";
import {
	StyledBox,
	StyledIconify,
	StyledListItem,
	StyledListItemIcon,
} from "./PagesNavigation.styles";

type PagesNavigationItemProps = {
	item: NavigationConfigItem;
	active: (path: string) => boolean;
};
const PagesNavigationItem = ({ item, active }: PagesNavigationItemProps) => {
	const theme = useTheme();
	const isActiveRoot = active(item.path);
	const { title, path, icon, info, children } = item;
	const [open, setOpen] = useState(isActiveRoot);
	const activeRootStyle = {
		color: "primary.main",
		fontWeight: "fontWeightMedium",
		bgcolor: alpha(
			theme.palette.primary.main,
			theme.palette.action.selectedOpacity,
		),
	};
	const activeSubStyle = {
		color: "text.primary",
		fontWeight: "fontWeightMedium",
	};
	if (children)
		return (
			<>
				<StyledListItem onClick={() => setOpen((prev: boolean) => !prev)}>
					<StyledListItemIcon>
						{icon && <Iconify icon={icon} />}
					</StyledListItemIcon>
					{info && info}
					<StyledIconify
						icon={
							open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-upward-fill"
						}
					/>
				</StyledListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{children.map((item) => {
							const { title, path } = item;
							const isActiveSub = active(path);
							return (
								<StyledListItem
									key={title}
									component={RouterLink}
									to={path}
									sx={{ ...(isActiveSub && activeSubStyle) }}
								>
									<StyledListItemIcon>
										<StyledBox
											sx={{
												transition: (theme) =>
													theme.transitions.create("transform"),
												...(isActiveSub && {
													transform: "scale(2)",
													bgcolor: "primary.main",
												}),
											}}
										/>
									</StyledListItemIcon>
									<ListItemText disableTypography primary={title} />
								</StyledListItem>
							);
						})}
					</List>
				</Collapse>
			</>
		);
	return (
		<StyledListItem
			component={RouterLink}
			to={path}
			sx={{ ...(isActiveRoot && activeRootStyle) }}
		>
			<StyledListItemIcon>{icon && <Iconify icon={icon} />}</StyledListItemIcon>
			<ListItemText disableTypography primary={title} />
			{info && info}
		</StyledListItem>
	);
};

export const PagesNavigation = () => {
	const { pathname } = useLocation();
	const match = (path: string) =>
		path ? !!matchPath({ path, end: false }, pathname) : false;
	return (
		<Box sx={{ my: 2 }}>
			<List disablePadding>
				{navigationConfig.map((item) => (
					<PagesNavigationItem key={item.title} item={item} active={match} />
				))}
			</List>
		</Box>
	);
};
