import Centered from "@storybook/addon-centered";
import { ComponentStory } from "@storybook/react";
import { CPFField } from "./CPFField";

export default {
	title: "inputs/CPF Field",
	component: CPFField,
	decorators: [Centered],
};

const Template: ComponentStory<typeof CPFField> = (args) => (
	<CPFField {...args} />
);

export const Default = Template.bind({});
Default.args = {
	defaultValue: "123.456.789-00",
};
