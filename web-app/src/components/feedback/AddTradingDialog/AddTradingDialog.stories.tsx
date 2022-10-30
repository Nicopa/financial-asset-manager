import centered from "@storybook/addon-centered/react";
import { ComponentStory } from "@storybook/react";
import { AddTradingDialog } from "./AddTradingDialog";

export default {
	title: "feedback/Add Trading Dialog",
	component: AddTradingDialog,
	decorators: [centered],
};

const Template: ComponentStory<typeof AddTradingDialog> = (args) => (
	<AddTradingDialog {...args} />
);

export const Opened = Template.bind({});
Opened.args = {
	open: true,
};
