import {
	Box,
	SxProps,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Theme,
	Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ChangeEventHandler, MouseEvent, MouseEventHandler } from "react";
import { EnhancedTableToolbar } from "../EnhancedTableToolbar";
import { StandardTableBodyRow } from "./StandardTableBodyRow";
export type StandardTableHeading = {
	id: string;
	label: string | JSX.Element;
	align?: "right" | "left" | "inherit" | "center" | "justify";
	sortable?: boolean;
};
export type Entry = {
	[key: string]: {
		value?: string | number | JSX.Element | Date | null;
		align?: "right" | "left" | "inherit" | "center" | "justify";
		sx?: SxProps<Theme>;
		children?: Entry[];
	};
};
type StandardTableProps = {
	title?: string;
	headings?: StandardTableHeading[];
	orderBy?: string;
	order?: "asc" | "desc";
	rowsPerPage: number;
	currentPageIndex: number;
	rowsTotal?: number;
	onSortHandler?: (property: string) => MouseEventHandler<HTMLAnchorElement>;
	onPageChange: (
		event: MouseEvent<HTMLButtonElement> | null,
		page: number,
	) => void;
	onRowsPerPageChange?: ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	>;
	onFilterClick?: MouseEventHandler<HTMLButtonElement>;
	entries?: Entry[];
};
export const StandardTable = ({
	title,
	headings,
	orderBy,
	order,
	rowsPerPage,
	currentPageIndex,
	rowsTotal,
	onSortHandler,
	onPageChange,
	onRowsPerPageChange,
	onFilterClick,
	entries,
}: StandardTableProps) => {
	const createSort = (): ((a: Entry, b: Entry) => number) | undefined => {
		if (!entries?.length || !orderBy) return undefined;
		if (typeof entries[0][orderBy].value === "string")
			return (a: Entry, b: Entry) => {
				const x = (a[orderBy].value as string).toLowerCase();
				const y = (b[orderBy].value as string).toLowerCase();
				if (order === "asc") return x < y ? -1 : x > y ? 1 : 0;
				return y < x ? -1 : y > x ? 1 : 0;
			};
		if (typeof entries[0][orderBy].value === "number")
			return (a: Entry, b: Entry) => {
				const x = a[orderBy].value as number;
				const y = b[orderBy].value as number;
				if (order === "asc") return x - y;
				return y - x;
			};
		if (entries[0][orderBy].value instanceof Date)
			return (a: Entry, b: Entry) => {
				const x = (a[orderBy].value as Date).getTime();
				const y = (b[orderBy].value as Date).getTime();
				if (order === "asc") return x - y;
				return y - x;
			};
		return (a: Entry, b: Entry) => {
			const x = JSON.stringify(String(a[orderBy].value));
			const y = JSON.stringify(String(b[orderBy].value));
			if (order === "asc") return x < y ? -1 : x > y ? 1 : 0;
			return y < x ? -1 : y > x ? 1 : 0;
		};
	};
	if (entries && !entries.length)
		return (
			<>
				<EnhancedTableToolbar
					title={title}
					numSelected={0}
					onFilterClick={onFilterClick}
				/>
				<TableContainer>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<Box sx={{ py: 2 }}>
										<Typography variant="h5" align="center">
											No entries found.
										</Typography>
									</Box>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</>
		);
	return (
		<>
			<EnhancedTableToolbar
				title={title}
				numSelected={0}
				onFilterClick={onFilterClick}
			/>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{headings &&
								headings.map((heading, index) => (
									<TableCell
										key={index}
										align={heading.align}
										sortDirection={
											orderBy === heading.id ? order ?? false : false
										}
										sx={
											heading.id === "options"
												? {
														position: "sticky",
														left: 0,
														zIndex: 2,
														backgroundColor: "background.paper",
														padding: 0,
												  }
												: undefined
										}
									>
										{heading.sortable ? (
											<TableSortLabel
												active={orderBy === heading.id}
												direction={orderBy === heading.id ? order : "asc"}
												onClick={
													onSortHandler ? onSortHandler(heading.id) : undefined
												}
											>
												{heading.label}
												{orderBy === heading.id ? (
													<Box component="span" sx={visuallyHidden}>
														{order === "desc"
															? "sorted descending"
															: "sorted ascending"}
													</Box>
												) : null}
											</TableSortLabel>
										) : (
											heading.label
										)}
									</TableCell>
								))}
						</TableRow>
					</TableHead>
					<TableBody>
						{entries ? (
							entries
								.sort(createSort())
								.map((entry, index) => (
									<StandardTableBodyRow key={index} entry={entry} />
								))
						) : (
							<StandardTableBodyRow loadingColumns={headings?.length} />
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				rowsPerPageOptions={[5, 10, 25]}
				count={rowsTotal ?? -1}
				rowsPerPage={rowsPerPage}
				page={currentPageIndex}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
			/>
		</>
	);
};
