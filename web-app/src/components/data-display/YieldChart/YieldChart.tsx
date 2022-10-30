import { Box, Card, CardHeader } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export type ChartProps = {
	title?: string;
	subheader?: string;
	chartData: Array<any>;
	chartLabels: Array<string>;
};

export const YieldChart = ({
	title,
	subheader,
	chartLabels,
	chartData,
	...props
}: ChartProps) => {
	const options = {
		chart: {
			id: "basic-bar",
		},
		xaxis: {
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
		},
	};
	const series = [
		{
			name: "series-1",
			data: [30, 40, 45, 50, 49, 60, 70, 91],
		},
	];
	return (
		<Card {...props}>
			<CardHeader title={title} subheader={subheader} />
			<Box sx={{ p: 3, paddingBottom: 1 }} dir="ltr">
				<ReactApexChart
					type="line"
					series={series}
					options={options}
					height={364}
				/>
			</Box>
		</Card>
	);
};
