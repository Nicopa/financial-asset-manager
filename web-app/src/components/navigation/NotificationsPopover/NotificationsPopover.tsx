import {
	Badge,
	Box,
	Divider,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { MouseEventHandler, useRef, useState } from "react";
import { Iconify } from "../../data-display/Iconify";
import {
	StyledIconButton,
	StyledMenuPopover,
} from "./NotificationsPopover.styles";

const NOTIFICATIONS = [
	{
		id: "1",
		title: "Your order is placed",
		description: "waiting for shipping",
		avatar: null,
		type: "order_placed",
		createdAt: new Date("2022-01-01T10:00:00"),
		isUnRead: true,
	},
	{
		id: "2",
		title: "title",
		description: "answered to your comment on the Minimal",
		avatar: "/static/mock-images/avatars/avatar_2.jpg",
		type: "friend_interactive",
		createdAt: new Date("2022-01-02T11:00:00"),
		isUnRead: true,
	},
	{
		id: "3",
		title: "You have new message",
		description: "5 unread messages",
		avatar: null,
		type: "chat_message",
		createdAt: new Date("2022-01-02T11:15:00"),
		isUnRead: false,
	},
	{
		id: "4",
		title: "You have new mail",
		description: "sent from Guido Padberg",
		avatar: null,
		type: "mail",
		createdAt: new Date("2022-01-02T11:30:00"),
		isUnRead: false,
	},
	{
		id: "5",
		title: "Delivery processing",
		description: "Your order is being shipped",
		avatar: null,
		type: "order_shipped",
		createdAt: new Date("2022-01-03T14:00:00"),
		isUnRead: false,
	},
];

export const NotificationsPopover = () => {
	const anchorRef = useRef(null);
	const [open, setOpen] =
		useState<(EventTarget & HTMLButtonElement) | null>(null);
	const [notifications, setNotifications] = useState(NOTIFICATIONS);
	const totalUnRead = notifications.filter(
		(notification) => notification.isUnRead === true
	).length;
	const handleIconButtonClick: MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		setOpen(event.currentTarget);
	};
	const handleMarkAllAsRead = () => {
		setNotifications(
			notifications.map((notification) => ({
				...notification,
				isUnRead: false,
			}))
		);
	};
	return (
		<>
			<StyledIconButton
				forwardRef={anchorRef}
				color={open ? "primary" : "default"}
				onClick={handleIconButtonClick}
			>
				<Badge badgeContent={totalUnRead} color="error">
					<Iconify icon="eva:bell-fill" sx={{ width: 20, height: 20 }} />
				</Badge>
			</StyledIconButton>
			<StyledMenuPopover
				open={Boolean(open)}
				anchorEl={open}
				onClose={() => setOpen(null)}
			>
				<Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant="subtitle1">Notifications</Typography>
						<Typography variant="body2" sx={{ color: "text.secondary" }}>
							You have {totalUnRead} unread{" "}
							{totalUnRead === 1 ? "message" : "messages"}
						</Typography>
					</Box>
					{totalUnRead && (
						<Tooltip title=" Mark all as read">
							<IconButton color="primary" onClick={handleMarkAllAsRead}>
								<Iconify
									icon="eva:done-all-fill"
									sx={{ width: 20, height: 20 }}
								/>
							</IconButton>
						</Tooltip>
					)}
				</Box>
				<Divider sx={{ borderStyle: "dashed" }} />
			</StyledMenuPopover>
		</>
	);
};
