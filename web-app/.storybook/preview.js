import { MemoryRouter, Route, Routes } from "react-router-dom";
import { withThemes } from "@react-theming/storybook-addon";
import { theme, ThemeProvider } from "../src/theme/theme";
import { addDecorator } from "@storybook/react";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
export const decorators = [
	(Story) => (
		<MemoryRouter>
			<Routes>
				<Route path="/*" element={<Story />} />
			</Routes>
		</MemoryRouter>
	),
];
addDecorator(withThemes(ThemeProvider, [theme]));
