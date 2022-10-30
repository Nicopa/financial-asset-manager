import {
	TableRow,
	TableCell,
	Skeleton,
	IconButton,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { CashInOutIcon } from "../../icon/CashInOutIcon";
import { Iconify } from "../Iconify";
import { Entry } from "./StandardTable";

type Props = {
	entry?: Entry;
	loadingColumns?: number;
	size?: "medium" | "small";
};
export const StandardTableBodyRow = ({
	entry,
	loadingColumns,
	size,
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	if (!entry)
		return (
			<TableRow>
				{[...Array(loadingColumns ?? 1)].map((value, index) => (
					<TableCell key={index}>
						<Skeleton />
					</TableCell>
				))}
			</TableRow>
		);
	const cells = Object.values(entry).filter((cell) => !!cell);
	const cellWithChildren = cells.find((cell) => cell && "children" in cell);
	const children = cellWithChildren ? cellWithChildren.children : undefined;
	return (
		<>
			<TableRow>
				{cells.map((cell, index) => (
					<TableCell key={index} align={cell.align} size={size} sx={cell.sx}>
						{cell.value instanceof Date ? (
							cell.value.toLocaleDateString()
						) : cell.value === "IN" ||
						  cell.value === "DISPOSAL" ||
						  cell.value === "OUT" ||
						  cell.value === "ACQUISITION" ? (
							<CashInOutIcon value={cell.value} />
						) : cell.children ? (
							<IconButton aria-label="expand" onClick={() => setOpen(!open)}>
								<Iconify
									icon={
										open
											? "eva:arrow-ios-upward-fill"
											: "eva:arrow-ios-downward-fill"
									}
								/>
							</IconButton>
						) : (
							<Typography variant={size === "small" ? "body2" : "body1"}>
								{cell.value}
							</Typography>
						)}
					</TableCell>
				))}
				{/* {false && (
				<TableCell align="right">
					<MoreMenu
						anchorOrigin={{ vertical: "top", horizontal: "left" }}
						transformOrigin={{ vertical: "top", horizontal: "right" }}
					>
						<MenuItem>Option1</MenuItem>
					</MoreMenu>
				</TableCell>
			)} */}
			</TableRow>
			{children &&
				open &&
				children.map((entry) => (
					<StandardTableBodyRow entry={entry} size="small" />
				))}
		</>
	);
};
