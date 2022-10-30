import { styled } from "@mui/material";

const CHART_HEIGHT = 342;
const LEGEND_HEIGHT = 72;

export const StyledChartWrapper = styled("div")(({ theme }) => ({
	height: CHART_HEIGHT,
	marginTop: theme.spacing(2),
	"& .apexcharts-canvas svg": {
		height: CHART_HEIGHT,
	},
	"& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
		overflow: "visible",
	},
	"& .apexcharts-legend": {
		height: LEGEND_HEIGHT,
		alignContent: "center",
		position: "relative !important",
		borderTop: `solid 1px ${theme.palette.divider}`,
		top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
	},
}));
