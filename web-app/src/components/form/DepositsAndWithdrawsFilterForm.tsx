import {
	Box,
	Checkbox,
	FormControl,
	Grid,
	Input,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import { FormEventHandler, ReactNode, useState } from "react";

type DepositsAndWithdrawsFilterFormProps = {
	id: string;
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const DepositsAndWithdrawsFilterForm = ({
	id,
	onSubmit,
}: DepositsAndWithdrawsFilterFormProps) => {
	const [broker, setBroker] = useState<string[]>([]);
	const [operation, setOperation] = useState<string[]>([]);
	const [currency, setCurrency] = useState<string[]>([]);
	const handleBrokerChange = (
		event: SelectChangeEvent<string[]>,
		child: ReactNode,
	) => {
		setBroker(
			typeof event.target.value === "string"
				? event.target.value.split(",")
				: event.target.value,
		);
	};
	const handleOperationChange = (
		event: SelectChangeEvent<string[]>,
		child: ReactNode,
	) => {
		setOperation(
			typeof event.target.value === "string"
				? event.target.value.split(",")
				: event.target.value,
		);
	};
	const handleCurrencyChange = (
		event: SelectChangeEvent<string[]>,
		child: ReactNode,
	) => {
		setCurrency(
			typeof event.target.value === "string"
				? event.target.value.split(",")
				: event.target.value,
		);
	};
	return (
		<Box component="form" id={id} onSubmit={onSubmit}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="brokerID-label">Broker</InputLabel>
						<Select
							id="brokerID"
							name="brokerID"
							multiple
							value={broker}
							onChange={handleBrokerChange}
							input={<OutlinedInput label="Broker" />}
						>
							{[
								{ value: "broker1", label: "Clear" },
								{ value: "broker2", label: "Nuinvest" },
							].map((option, index) => (
								<MenuItem key={index} value={option.value}>
									<Checkbox checked={broker.indexOf(option.value) > -1} />
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="operation-label">Operation</InputLabel>
						<Select
							id="operation"
							name="operation"
							multiple
							value={operation}
							onChange={handleOperationChange}
							input={<OutlinedInput label="Operation" />}
						>
							{[
								{ value: "IN", label: "Cash in" },
								{ value: "OUT", label: "Cash out" },
							].map((option, index) => (
								<MenuItem key={index} value={option.value}>
									<Checkbox checked={operation.indexOf(option.value) > -1} />
									{option.label}
								</MenuItem>
							))}
						</Select>
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
						<InputLabel id="currency-label">Currency</InputLabel>
						<Select
							id="currency"
							name="currency"
							multiple
							value={currency}
							onChange={handleCurrencyChange}
							input={<OutlinedInput label="Currency" />}
						>
							{[
								{ value: "BRL", label: "Real brasileiro" },
								{ value: "USD", label: "US Dollars" },
							].map((option, index) => (
								<MenuItem key={index} value={option.value}>
									<Checkbox checked={currency.indexOf(option.value) > -1} />
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin="dense">
						<InputLabel id="valueComparisonOperator-label">
							Comparison operator
						</InputLabel>
						<Select
							id="valueComparisonOperator"
							name="valueComparisonOperator"
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
						<InputLabel id="value-label">Value amount</InputLabel>
						<Input id="valueAmount" name="valueAmount" />
					</FormControl>
				</Grid>
			</Grid>
		</Box>
	);
};
