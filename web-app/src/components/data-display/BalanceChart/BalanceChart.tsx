import { Card, CardHeader } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { StyledChartWrapper } from "./BalanceChart.styles";

export type BalanceChartProps = {
	title?: string;
	subheader?: string;
	chartData: {
		name: string;
		data: number[];
	}[];
	chartColors: Array<string>;
	chartLabels: Array<string>;
};
export const BalanceChart = ({
	title,
	subheader,
	chartData,
	chartColors,
	chartLabels,
}: BalanceChartProps) => {
	const options = {
		xaxis: {
			categories: chartLabels,
			labels: {
				style: {
					colors: chartColors,
				},
			},
		},
	};
	return (
		<Card>
			<CardHeader title={title} subheader={subheader} />
			<StyledChartWrapper dir="ltr">
				<ReactApexChart
					type="radar"
					series={chartData}
					options={options}
					height={340}
				/>
			</StyledChartWrapper>
		</Card>
	);
};
