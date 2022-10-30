import {
	ThemeProvider as MUIThemeProvider,
	StyledEngineProvider,
	CssBaseline,
	createTheme,
} from "@mui/material";
import { ReactNode } from "react";
import componentsOverrides from "./overrides";
import palette from "./palette";
import shadows, { CustomShadows, customShadows } from "./shadows";
import typography from "./typography";

declare module "@mui/material/styles" {
	interface ThemeOptions {
		customShadows: CustomShadows;
	}
}

type Props = {
	children: ReactNode;
};
export const theme = createTheme({
	palette,
	shape: { borderRadius: 8 },
	typography,
	shadows,
	customShadows,
});
export const ThemeProvider = ({ children }: Props) => {
	theme.components = componentsOverrides(theme);
	return (
		<StyledEngineProvider injectFirst>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</StyledEngineProvider>
	);
};
