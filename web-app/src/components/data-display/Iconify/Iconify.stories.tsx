import Centered from "@storybook/addon-centered";
import { ComponentStory } from "@storybook/react";
import { Iconify } from "./Iconify";

export default {
	title: "data-display/Iconify",
	component: Iconify,
	decorators: [Centered],
};

const Template: ComponentStory<typeof Iconify> = (args) => (
	<Iconify {...args} />
);

export const EvaEditFill = Template.bind({});
EvaEditFill.args = {
	icon: "eva:edit-fill",
};

export const EvaMoreVerticalFill = Template.bind({});
EvaMoreVerticalFill.args = {
	icon: "eva:more-vertical-fill",
	sx: {
		width: 20,
		height: 20,
	},
};

export const EvaTrash2Outline = Template.bind({});
EvaTrash2Outline.args = {
	icon: "eva:trash-2-outline",
	sx: {
		width: 40,
		height: 40,
	},
};

export const EvaMenu2Fill = Template.bind({});
EvaMenu2Fill.args = {
	icon: "eva:menu-2-fill",
	sx: {
		width: 20,
		height: 20,
	},
};
