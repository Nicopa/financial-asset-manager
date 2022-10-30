import centered from "@storybook/addon-centered/react";
import { ComponentStory } from "@storybook/react";
import { Login } from "./Login";

export default {
	title: "compound/Login",
	component: Login,
	decorators: [centered],
};

const Template: ComponentStory<typeof Login> = () => <Login />;

export const Default = Template.bind({});
