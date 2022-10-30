import { CardProps, Card, CardHeader, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useChart } from "../../../hooks/useChart";
import { StyledChartWrapper } from "./PieChart.styles";

type PieChartProps = CardProps & {
	title: string;
	subheader?: string;
	chartColors: string[];
	chartData: {
		label: string;
		value: number;
	}[];
};
export const PieChart = ({
	title,
	subheader,
	chartColors,
	chartData = [],
	...props
}: PieChartProps) => {
	const theme = useTheme();
	const chartOptions = useChart({
		colors: chartColors,
		labels: chartData.map((i) => i.label),
		stroke: { colors: [theme.palette.background.paper] },
		legend: { floating: true, horizontalAlign: "center" },
		dataLabels: { enabled: true, dropShadow: { enabled: false } },
		tooltip: {
			fillSeriesColor: false,
			y: {
				formatter: (seriesName) => String(seriesName),
				title: {
					formatter: (seriesName) => `${seriesName}`,
				},
			},
		},
		plotOptions: {
			pie: { donut: { labels: { show: false } } },
		},
	});
	return (
		<Card {...props}>
			<CardHeader title={title} subheader={subheader} />
			<StyledChartWrapper dir="ltr">
				<ReactApexChart
					type="pie"
					series={chartData.map((i) => i.value)}
					options={chartOptions}
					height={280}
				/>
			</StyledChartWrapper>
		</Card>
	);
};
