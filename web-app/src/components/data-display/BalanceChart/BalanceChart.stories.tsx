import centered from "@storybook/addon-centered/react";
import { ComponentStory } from "@storybook/react";
import palette from "../../../theme/palette";
import { BalanceChart } from "./BalanceChart";

export default {
	title: "data-display/Balance Chart",
	component: BalanceChart,
	decorators: [centered],
};

const Template: ComponentStory<typeof BalanceChart> = (args) => (
	<BalanceChart {...args} />
);

export const Default = Template.bind({});
Default.args = {
	title: "Current Subject",
	chartLabels: [
		"English",
		"History",
		"Physics",
		"Geography",
		"Chinese",
		"Math",
	],
	chartData: [
		{ name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
		{ name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
		{ name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
	],
	chartColors: [...Array(6)].map(() => palette.text!.secondary!),
};
