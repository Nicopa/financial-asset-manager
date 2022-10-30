import centered from "@storybook/addon-centered/react";
import { ComponentStory } from "@storybook/react";
import { NotificationsPopover } from "./NotificationsPopover";

export default {
	title: "navigation/Notifications Popover",
	component: NotificationsPopover,
	decorators: [centered],
};

const Template: ComponentStory<typeof NotificationsPopover> = () => (
	<NotificationsPopover />
);

export const Default = Template.bind({});
