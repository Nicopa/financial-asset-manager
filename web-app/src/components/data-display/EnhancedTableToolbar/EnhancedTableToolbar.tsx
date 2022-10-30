import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { MouseEventHandler } from "react";
import { Iconify } from "../Iconify";

interface EnhancedTableToolbarProps {
	title?: string;
	numSelected?: number;
	onFilterClick?: MouseEventHandler<HTMLButtonElement>;
}
export const EnhancedTableToolbar = ({
	title,
	numSelected,
	onFilterClick,
}: EnhancedTableToolbarProps) => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected &&
					numSelected > 0 && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity,
							),
					}),
			}}
		>
			{numSelected && numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : title ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					{title}
				</Typography>
			) : null}
			{numSelected && numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<Iconify icon="eva:trash-2-outline" />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton onClick={onFilterClick}>
						<Iconify icon="eva:funnel-outline" />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};
