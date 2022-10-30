import {
	Box,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import { FormEventHandler } from "react";
import { CashFlowFilters } from "../../hooks/useCashFlows";
import { Account, CurrencySymbol } from "../../types";
import { MoneyField } from "../inputs/MoneyField";
import { MultipleSelect } from "../inputs/MultipleSelect";

type CashFlowFilterFormProps = {
	id: string;
	filters: CashFlowFilters;
	accounts?: Account[];
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const CashFlowFilterForm = ({
	id,
	filters,
	accounts,
	onSubmit,
}: CashFlowFilterFormProps) => {
	return (
		<Box component="form" id={id} onSubmit={onSubmit} method="get">
			<Grid container spacing={1}>
				{accounts && (
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth margin="dense">
							<InputLabel id="brokerID-label">Broker</InputLabel>
							<MultipleSelect
								id="brokerID"
								name="brokerID"
								label="Broker"
								defaultValue={filters.brokerID?.split(",")}
								options={accounts.map((account) => ({
									value: account.brokerID,
									label: account.tradingName,
								}))}
								margin="dense"
							/>
						</FormControl>
					</Grid>
				)}
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="brokerID-label">Operation</InputLabel>
						<MultipleSelect
							id="operation"
							name="operation"
							label="Operation"
							defaultValue={filters.operation?.split(",")}
							options={[
								{ value: "IN", label: "Cash in" },
								{ value: "OUT", label: "Cash out" },
							]}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="operationDateComparisonOperator-label">
							Comparison operator
						</InputLabel>
						<Select
							id="operationDateComparisonOperator"
							name="operationDateComparisonOperator"
							input={<OutlinedInput label="Comparison Operator" />}
							defaultValue={filters.operationDateComparisonOperator || ""}
						>
							{[
								{ value: "", label: "None" },
								{ value: "equalTo", label: "Equal" },
								{ value: "before", label: "Before" },
								{ value: "since", label: "Since" },
							].map((option, index) => (
								<MenuItem key={index} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="operationDate"
						name="operationDate"
						label="Operation date"
						type="date"
						fullWidth
						variant="standard"
						margin="dense"
						InputLabelProps={{ shrink: true }}
						defaultValue={filters.operationDate || ""}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="settlementDateComparisonOperator-label">
							Comparison operator
						</InputLabel>
						<Select
							id="settlementDateComparisonOperator"
							name="settlementDateComparisonOperator"
							input={<OutlinedInput label="Comparison Operator" />}
							defaultValue={filters.settlementDateComparisonOperator || ""}
						>
							{[
								{ value: "", label: "None" },
								{ value: "equalTo", label: "Equal" },
								{ value: "before", label: "Before" },
								{ value: "since", label: "Since" },
							].map((option, index) => (
								<MenuItem key={index} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="settlementDate"
						name="settlementDate"
						label="Settlement date"
						type="date"
						fullWidth
						variant="standard"
						margin="dense"
						InputLabelProps={{ shrink: true }}
						defaultValue={filters.settlementDate || ""}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="valueCurrency-label">Currency</InputLabel>
						<MultipleSelect
							id="valueCurrency"
							name="valueCurrency"
							label="Currency"
							defaultValue={filters.valueCurrency?.split(",")}
							options={[
								{ value: "BRL", label: "Real brasileiro" },
								{ value: "USD", label: "US Dollars" },
							]}
							margin="dense"
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="valueAmountComparisonOperator-label">
							Comparison operator
						</InputLabel>
						<Select
							id="valueAmountComparisonOperator"
							name="valueAmountComparisonOperator"
							input={<OutlinedInput label="Comparison Operator" />}
							defaultValue={filters.valueAmountComparisonOperator || ""}
						>
							{[
								{ value: "", label: "" },
								{ value: "equalTo", label: "=" },
								{ value: "greaterThan", label: ">" },
								{ value: "lessThan", label: "<" },
								{ value: "greaterThanOrEqualTo", label: ">=" },
								{ value: "lessThanOrEqualTo", label: "<=" },
							].map((option, index) => (
								<MenuItem key={index} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<MoneyField
						id="valueAmount"
						name="valueAmount"
						label="Value"
						fullWidth
						variant="standard"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									{CurrencySymbol.DEFAULT}
								</InputAdornment>
							),
						}}
						margin="dense"
						defaultValue={filters.valueAmount || ""}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
