import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";
import {
	ChangeEvent,
	ChangeEventHandler,
	FormEventHandler,
	useState,
} from "react";
import { Account, CurrencySymbol } from "../../types";
import { MoneyField } from "../inputs/MoneyField";

type WithdrawFormProps = {
	id: string;
	accounts?: Account[];
	brokerID: string | null;
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const WithdrawForm = ({
	id,
	accounts,
	brokerID,
	onSubmit,
}: WithdrawFormProps) => {
	const [currencyAdornment, setCurrencyAdornment] = useState<string>(
		CurrencySymbol.BRL,
	);
	const defaultDate = `${new Date().getFullYear().toString()}-${(
		new Date().getMonth() + 1
	)
		.toString()
		.padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
	const handleCurrencyChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as keyof typeof CurrencySymbol;
		const symbol =
			value in CurrencySymbol ? CurrencySymbol[value] : CurrencySymbol.DEFAULT;
		setCurrencyAdornment(symbol);
	};
	return (
		<Box id={id} component="form" onSubmit={onSubmit}>
			<TextField
				select
				name="brokerID"
				label="Account"
				fullWidth
				margin="dense"
				variant="standard"
				value={
					brokerID
						? brokerID
						: accounts
						? accounts.length
							? accounts[0].brokerID
							: ""
						: ""
				}
			>
				{accounts &&
					accounts.map((account, index) => (
						<MenuItem key={index} value={account.brokerID}>
							{account.tradingName}
						</MenuItem>
					))}
			</TextField>
			<TextField
				id="date"
				name="date"
				label="Date"
				type="date"
				fullWidth
				variant="standard"
				margin="dense"
				InputLabelProps={{ shrink: true }}
				defaultValue={defaultDate}
			/>
			<TextField
				select
				name="currency"
				label="Currency"
				fullWidth={true}
				onChange={handleCurrencyChange}
				margin="dense"
				variant="standard"
				defaultValue={"BRL"}
			>
				{[
					{ value: "BRL", label: "Real brasileiro" },
					{ value: "USD", label: "US Dollars" },
				].map((option, index) => (
					<MenuItem key={index} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
			<MoneyField
				id="amount"
				name="amount"
				label="Value"
				fullWidth
				variant="standard"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{currencyAdornment}
						</InputAdornment>
					),
				}}
				margin="dense"
			/>
		</Box>
	);
};
