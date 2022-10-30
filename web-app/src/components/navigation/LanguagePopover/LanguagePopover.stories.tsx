import Centered from "@storybook/addon-centered";
import { ComponentStory } from "@storybook/react";
import { LanguagePopover } from "./LanguagePopover";

export default {
	title: "navigation/Language Popover",
	component: LanguagePopover,
	decorators: [Centered],
};

const Template: ComponentStory<typeof LanguagePopover> = () => (
	<LanguagePopover />
);

export const Default = Template.bind({});
