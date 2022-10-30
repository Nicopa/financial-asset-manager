import { ComponentStory } from "@storybook/react";
import { SummaryCard } from "./SummaryCard";

export default {
	title: "data-display/Summary Card",
	component: SummaryCard,
};

const Template: ComponentStory<typeof SummaryCard> = (args) => (
	<SummaryCard {...args} />
);

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
	title: "Bug Reports",
	value: 234,
	color: "primary",
	icon: "ant-design:android-filled",
};

export const InfoColor = Template.bind({});
InfoColor.args = {
	title: "Bug Reports",
	value: 234,
	color: "info",
	icon: "ant-design:apple-filled",
};

export const ErrorColor = Template.bind({});
ErrorColor.args = {
	title: "Bug Reports",
	value: 234,
	color: "error",
	icon: "ant-design:bug-filled",
};
