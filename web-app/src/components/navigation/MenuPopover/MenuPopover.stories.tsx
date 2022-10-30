import { MenuItem, Stack } from "@mui/material";
import Centered from "@storybook/addon-centered";
import { ComponentStory } from "@storybook/react";
import { MenuPopover } from "./MenuPopover";

export default {
	title: "navigation/Menu Popover",
	component: MenuPopover,
	decorators: [Centered],
};

const Template: ComponentStory<typeof MenuPopover> = (args) => (
	<MenuPopover {...args} />
);

export const Default = Template.bind({});
Default.args = {
	open: true,
	children: (
		<Stack>
			<MenuItem>Menu Item 1</MenuItem>
			<MenuItem>Menu Item 2</MenuItem>
			<MenuItem>Menu Item 3</MenuItem>
		</Stack>
	),
};
