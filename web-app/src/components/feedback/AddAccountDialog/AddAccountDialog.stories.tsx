import { ComponentStory } from "@storybook/react";
import { AddAccountDialog } from "./AddAccountDialog";

export default {
	title: "feedback/Add Account Dialog",
	component: AddAccountDialog,
};

const Template: ComponentStory<typeof AddAccountDialog> = (args) => (
	<AddAccountDialog {...args} />
);

export const Opened = Template.bind({});
Opened.args = {
	open: true,
	brokers: [
		{ id: "brokerid1", tradingName: "Broker 1" },
		{ id: "brokerid2", tradingName: "Broker 2" },
	],
};
