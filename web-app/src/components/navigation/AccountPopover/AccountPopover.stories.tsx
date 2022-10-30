import centered from "@storybook/addon-centered/react";
import { ComponentStory } from "@storybook/react";
import { AccountPopover } from "./AccountPopover";
import { BrowserRouter } from "react-router-dom";

export default {
	title: "navigation/Account Popover",
	component: AccountPopover,
	decorators: [centered],
};

const Template: ComponentStory<typeof AccountPopover> = (args) => (
	<BrowserRouter>
		<AccountPopover {...args} />
	</BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
	username: "testinguser",
};
