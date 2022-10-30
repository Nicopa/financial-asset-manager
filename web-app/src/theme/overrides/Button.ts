import { Theme } from "@mui/material";
export default function Button(theme: Theme) {
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					"&:hover": {
						boxShadow: "none",
					},
				},
				sizeLarge: {
					height: 48,
				},
				containedInherit: {
					color: theme.palette.grey[800],
					boxShadow: theme.shadows[1],
					"&:hover": {
						backgroundColor: theme.palette.grey[400],
					},
				},
				containedPrimary: {
					boxShadow: theme.shadows[1],
				},
				containedSecondary: {
					boxShadow: theme.shadows[1],
				},
				outlinedInherit: {
					border: `1px solid ${theme.palette.grey[500]}`,
					"&:hover": {
						backgroundColor: theme.palette.action.hover,
					},
				},
				textInherit: {
					"&:hover": {
						backgroundColor: theme.palette.action.hover,
					},
				},
			},
		},
	};
}
