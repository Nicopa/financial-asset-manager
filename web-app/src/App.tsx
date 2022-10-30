import { CssBaseline } from "@mui/material";
import { Router } from "./Router";
import { ThemeProvider } from "./theme/theme";

export default function App() {
	return (
		<ThemeProvider>
			<CssBaseline />
			<Router />
		</ThemeProvider>
	);
}
