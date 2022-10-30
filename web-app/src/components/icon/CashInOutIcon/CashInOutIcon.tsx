import { useTheme } from "@mui/material";
import { Iconify } from "../../data-display/Iconify";

type Props = {
	value: "IN" | "OUT" | "ACQUISITION" | "DISPOSAL";
};
export const CashInOutIcon = ({ value }: Props) => {
	const theme = useTheme();
	if (value === "IN" || value === "DISPOSAL")
		return (
			<Iconify
				icon="eva:arrow-circle-up-fill"
				sx={{ width: 20, height: 20, color: theme.palette.money!.in }}
			/>
		);
	return (
		<Iconify
			icon="eva:arrow-circle-down-fill"
			sx={{
				width: 20,
				height: 20,
				color: theme.palette.money!.out,
			}}
		/>
	);
};
