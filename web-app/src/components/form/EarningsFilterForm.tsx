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
import { EarningFilters } from "../../hooks/useEarnings";
import { Account, CurrencySymbol } from "../../types";
import { MoneyField } from "../inputs/MoneyField";
import { MultipleSelect } from "../inputs/MultipleSelect";

type EarningsFilterFormProps = {
	id: string;
	filters: EarningFilters;
	accounts?: Account[];
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const EarningsFilterForm = ({
	id,
	filters,
	accounts,
	onSubmit,
}: EarningsFilterFormProps) => {
	return (
		<Box component="form" id={id} onSubmit={onSubmit}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<TextField
						id="assetName"
						name="assetName"
						label="Asset name"
						fullWidth
						variant="standard"
						margin="dense"
						defaultValue={filters.assetName}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="assetType-label">Asset Type</InputLabel>
						<MultipleSelect
							id="assetType"
							name="assetType"
							label="Broker"
							defaultValue={filters.assetType?.split(",")}
							options={[
								{ value: "BRAZILIAN_STOCK", label: "Stock" },
								{ value: "BRAZILIAN_REAL_ESTATE", label: "Real State" },
								{ value: "BRAZILIAN_DEPOSITARY_RECEIPT", label: "BDR" },
								{ value: "BRAZILIAN_ETF", label: "ETF" },
								{ value: "CDB", label: "CDB" },
							]}
							margin="dense"
						/>
					</FormControl>
				</Grid>
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
						<InputLabel id="type-label">Type</InputLabel>
						<MultipleSelect
							id="type"
							name="type"
							label="Type"
							defaultValue={filters.type?.split(",")}
							options={[
								{ value: "AMORTIZATION", label: "Amortization" },
								{ value: "DIVIDEND", label: "Dividend" },
								{ value: "INCOME", label: "Income" },
								{ value: "JCP", label: "JCP" },
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
							defaultValue={""}
						>
							{[
								{ value: "", label: "" },
								{ value: "equal", label: "Equal" },
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
							defaultValue={""}
						>
							{[
								{ value: "", label: "" },
								{ value: "equal", label: "Equal" },
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
				<Grid item xs={12}>
					<TextField
						id="quantity"
						label="Quantity"
						fullWidth
						variant="standard"
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
