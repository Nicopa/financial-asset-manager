import {
	Box,
	FormControl,
	Grid,
	Input,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import { FormEventHandler } from "react";
import { TradingFilters } from "../../hooks/useTradings";
import { Account } from "../../types";
import { MultipleSelect } from "../inputs/MultipleSelect";

type TradingsFilterFormProps = {
	id: string;
	filters: TradingFilters;
	accounts?: Account[];
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const TradingsFilterForm = ({
	id,
	filters,
	accounts,
	onSubmit,
}: TradingsFilterFormProps) => {
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
						<InputLabel id="brokerID-label">Operation</InputLabel>
						<MultipleSelect
							id="operation"
							name="operation"
							label="Operation"
							defaultValue={filters.operation?.split(",")}
							options={[
								{ value: "ACQUISITION", label: "Acquisition" },
								{ value: "DISPOSAL", label: "Disposal" },
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
					<TextField
						id="quantity"
						label="Quantity"
						fullWidth
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="currency-label">Currency</InputLabel>
						<MultipleSelect
							id="currency"
							name="currency"
							label="Currency"
							defaultValue={filters.currency?.split(",")}
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
						<InputLabel id="grossTotalComparisonOperator-label">
							Comparison operator
						</InputLabel>
						<Select
							id="grossTotalComparisonOperator"
							name="grossTotalComparisonOperator"
							input={<OutlinedInput label="Comparison Operator" />}
							defaultValue={""}
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
					<FormControl fullWidth margin="dense">
						<InputLabel id="grossTotal-label">Gross total amount</InputLabel>
						<Input id="grossTotalAmount" name="grossTotalAmount" />
					</FormControl>
				</Grid>
			</Grid>
		</Box>
	);
};
