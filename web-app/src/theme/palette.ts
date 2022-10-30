import { Color } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import { alpha, PaletteColor, PaletteOptions } from "@mui/material/styles";

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
	return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY: Color & {
	0: string;
	500_8: string;
	500_12: string;
	500_16: string;
	500_24: string;
	500_32: string;
	500_48: string;
	500_56: string;
	500_80: string;
} = {
	0: "#FFFFFF",
	50: "#fafafa",
	100: "#F9FAFB",
	200: "#F4F6F8",
	300: "#DFE3E8",
	400: "#C4CDD5",
	500: "#919EAB",
	600: "#637381",
	700: "#454F5B",
	800: "#212B36",
	900: "#161C24",
	A100: "#f5f5f5",
	A200: "#eeeeee",
	A400: "#bdbdbd",
	A700: "#616161",
	500_8: alpha("#919EAB", 0.08),
	500_12: alpha("#919EAB", 0.12),
	500_16: alpha("#919EAB", 0.16),
	500_24: alpha("#919EAB", 0.24),
	500_32: alpha("#919EAB", 0.32),
	500_48: alpha("#919EAB", 0.48),
	500_56: alpha("#919EAB", 0.56),
	500_80: alpha("#919EAB", 0.8),
};

declare module "@mui/material/styles" {
	interface Palette {
		gradients: typeof GRADIENTS;
		chart: typeof CHART_COLORS;
		money: {
			in: string;
			out: string;
		};
	}
	interface PaletteOptions {
		gradients?: typeof GRADIENTS;
		chart?: typeof CHART_COLORS;
		money?: {
			in: string;
			out: string;
		};
	}
	interface PaletteColor {
		lighter: string;
		darker: string;
	}
	interface TypeBackground {
		neutral: string;
	}
}

const PRIMARY: PaletteColor = {
	lighter: "#D1E9FC",
	light: "#76B0F1",
	main: "#2065D1",
	dark: "#103996",
	darker: "#061B64",
	contrastText: "#fff",
};

const SECONDARY: PaletteColor = {
	lighter: "#D6E4FF",
	light: "#84A9FF",
	main: "#3366FF",
	dark: "#1939B7",
	darker: "#091A7A",
	contrastText: "#fff",
};

const INFO: PaletteColor = {
	lighter: "#D0F2FF",
	light: "#74CAFF",
	main: "#1890FF",
	dark: "#0C53B7",
	darker: "#04297A",
	contrastText: "#fff",
};

const SUCCESS: PaletteColor = {
	lighter: "#E9FCD4",
	light: "#AAF27F",
	main: "#54D62C",
	dark: "#229A16",
	darker: "#08660D",
	contrastText: GREY[800],
};

const WARNING: PaletteColor = {
	lighter: "#FFF7CD",
	light: "#FFE16A",
	main: "#FFC107",
	dark: "#B78103",
	darker: "#7A4F01",
	contrastText: GREY[800],
};

const ERROR: PaletteColor = {
	lighter: "#FFE7D9",
	light: "#FFA48D",
	main: "#FF4842",
	dark: "#B72136",
	darker: "#7A0C2E",
	contrastText: "#fff",
};

const GRADIENTS = {
	primary: createGradient(PRIMARY.light!, PRIMARY.main),
	info: createGradient(INFO.light!, INFO.main),
	success: createGradient(SUCCESS.light!, SUCCESS.main),
	warning: createGradient(WARNING.light!, WARNING.main),
	error: createGradient(ERROR.light!, ERROR.main),
};

const CHART_COLORS = {
	violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
	blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
	green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
	yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
	red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

/* export type CustomPalette = PaletteOptions & {
	grey: typeof GREY;
	gradients?: typeof GRADIENTS;
	chart?: typeof CHART_COLORS;
	background: TypeBackground & {
		neutral: string;
	};
	money?: {
		in: string;
		out: string;
	};
}; */
const palette: PaletteOptions = {
	common: { black: "#000", white: "#fff" },
	primary: { ...PRIMARY },
	secondary: { ...SECONDARY },
	info: { ...INFO },
	success: { ...SUCCESS },
	warning: { ...WARNING },
	error: { ...ERROR },
	grey: GREY,
	gradients: GRADIENTS,
	chart: CHART_COLORS,
	divider: GREY[500_24],
	text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
	background: { paper: "#fff", default: GREY[100], neutral: GREY[200] },
	action: {
		active: GREY[600],
		hover: GREY[500_8],
		selected: GREY[500_16],
		disabled: GREY[500_80],
		disabledBackground: GREY[500_24],
		focus: GREY[500_24],
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
	},
	money: {
		in: green[500],
		out: orange[500],
	},
};

export default palette;
