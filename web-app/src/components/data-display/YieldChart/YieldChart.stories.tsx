import { ComponentStory } from "@storybook/react";
import { YieldChart } from "./YieldChart";

export default {
	title: "data-display/Yield Chart",
	component: YieldChart,
};

const Template: ComponentStory<typeof YieldChart> = (args) => (
	<YieldChart {...args} />
);

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
	title: "Website Visits",
	subheader: "(+43%) than last year",
	chartLabels: [
		"01/01/2003",
		"02/01/2003",
		"03/01/2003",
		"04/01/2003",
		"05/01/2003",
		"06/01/2003",
		"07/01/2003",
		"08/01/2003",
		"09/01/2003",
		"10/01/2003",
		"11/01/2003",
	],
	chartData: [
		{
			name: "Team A",
			type: "column",
			fill: "solid",
			data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
		},
		{
			name: "Team B",
			type: "area",
			fill: "gradient",
			data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
		},
		{
			name: "Team C",
			type: "line",
			fill: "solid",
			data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
		},
	],
};
