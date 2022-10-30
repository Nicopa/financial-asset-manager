import { ChangeEvent, MouseEvent, useState } from "react";

type Props = {
	orderBy: string;
	order?: "asc" | "desc";
	currentPageIndex?: number;
	rowsPerPage?: number;
	rowsTotal?: number;
};
export function useTable(props: Props) {
	const [order, setOrder] = useState<"asc" | "desc">(props.order ?? "asc");
	const [orderBy, setOrderBy] = useState<string>(props.orderBy);
	const [selected, setSelected] = useState<readonly string[]>([]);
	const [currentPageIndex, setCurrentPageIndex] = useState<number>(
		props.currentPageIndex ?? 0,
	);
	const [rowsPerPage, setRowsPerPage] = useState<number>(
		props.rowsPerPage ?? 5,
	);
	const [rowsTotal, setRowsTotal] = useState<number | undefined>(
		props.rowsTotal,
	);
	const handleChangePage = (event: unknown, newPage: number) =>
		setCurrentPageIndex(newPage);

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setCurrentPageIndex(0);
	};
	const createOrderHandler =
		(property: string) => (event: MouseEvent<unknown>) => {
			setOrderStates(event, property);
		};
	const setOrderStates = (
		event: React.MouseEvent<unknown>,
		property: string,
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};
	return {
		order,
		orderBy,
		selected,
		setSelected,
		currentPageIndex,
		rowsPerPage,
		rowsTotal,
		setRowsTotal,
		handleChangePage,
		handleChangeRowsPerPage,
		createOrderHandler,
	};
}
