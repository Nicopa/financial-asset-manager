import { ComponentMeta, ComponentStory } from "@storybook/react";
import centered from "@storybook/addon-centered";
import { MoreMenu } from "./MoreMenu";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Iconify } from "../../data-display/Iconify";

export default {
	title: "data-display/MoreMenu",
	component: MoreMenu,
	argTypes: {},
	decorators: [centered],
} as ComponentMeta<typeof MoreMenu>;

const Template: ComponentStory<typeof MoreMenu> = () => (
	<MoreMenu>
		<MenuItem>
			<ListItemText primary="Option 1" />
		</MenuItem>
		<MenuItem>
			<ListItemIcon>
				<Iconify icon="eva:trash-2-outline" />
			</ListItemIcon>
			<ListItemText primary="option 2" />
		</MenuItem>
	</MoreMenu>
);

export const Default = Template.bind({});
