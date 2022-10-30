import { ComponentStory } from "@storybook/react";
import { SignUp, SignUpData } from "./SignUp";

export default {
	title: "compound/Sign Up",
	component: SignUp,
};

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />;

export const Default = Template.bind({});
Default.args = {
	onSubmit: async (data: SignUpData): Promise<void> => {},
};
