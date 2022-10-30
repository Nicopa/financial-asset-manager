import {
	alpha,
	Palette,
	PaletteColor,
	SxProps,
	Theme,
	Typography,
	useTheme,
} from "@mui/material";
import { Iconify } from "../Iconify";
import { StyledCard, StyledIconWrapper } from "./SummaryCard.styles";

export type SummaryCardProps = {
	title: string;
	value: number | string;
	icon?: string;
	color?: keyof Palette;
	sx?: SxProps<Theme>;
};
export const SummaryCard = ({
	title,
	value,
	icon,
	color = "primary",
	sx,
	...other
}: SummaryCardProps) => {
	const theme = useTheme();
	return (
		<StyledCard
			sx={{
				color: (theme) => (theme.palette[color] as PaletteColor).dark,
				bgcolor: (theme.palette[color] as { lighter: string } & PaletteColor)
					.lighter,
				...sx,
			}}
			{...other}
		>
			<StyledIconWrapper
				sx={{
					color: (theme) => (theme.palette[color] as PaletteColor).dark,
					backgroundImage: (theme) =>
						`linear-gradient(135deg, ${alpha(
							(theme.palette[color] as PaletteColor).dark,
							0,
						)} 0%, ${alpha(
							(theme.palette[color] as PaletteColor).dark,
							0.24,
						)} 100%)`,
				}}
			>
				{icon && <Iconify icon={icon} sx={{ width: 24, height: 24 }} />}
			</StyledIconWrapper>
			<Typography variant="h3">{value}</Typography>
			<Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
				{title}
			</Typography>
		</StyledCard>
	);
};
