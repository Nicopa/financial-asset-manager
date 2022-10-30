import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";
import { FormEventHandler } from "react";
import { findAssetsByName } from "../../api/asset-manager";
import { useCurrencyAdornment } from "../../hooks/useCurrencyAdornment";
import { Account } from "../../types";
import {
	AsyncSearchField,
	AsyncSearchFieldOption,
} from "../inputs/AsyncSearchField/AsyncSearchField";
import { MoneyField } from "../inputs/MoneyField";

type Props = {
	id: string;
	assets?: {
		id: string;
		name: string;
	}[];
	accounts?: Account[];
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const TradingForm = ({ id, assets, accounts, onSubmit }: Props) => {
	const { currencyAdornment, onCurrencyChange } = useCurrencyAdornment();
	const loadOptions = async (
		value: string,
	): Promise<AsyncSearchFieldOption[]> => {
		return (await findAssetsByName(value)).map((data) => ({
			value: data.id,
			label: data.name,
		}));
	};
	return (
		<Box component="form" id={id} onSubmit={onSubmit}>
			<AsyncSearchField
				loadOptions={loadOptions}
				name="assetID"
				label="Asset"
			/>
			{/* {assets && (
				<TextField
					select
					name="assetID"
					label="Asset"
					fullWidth
					margin="dense"
					variant="standard"
					defaultValue={""}
				>
					{assets.map((asset, index) => (
						<MenuItem key={index} value={asset.id}>
							{asset.name}
						</MenuItem>
					))}
				</TextField>
			)} */}
			{accounts && (
				<TextField
					select
					name="brokerID"
					label="Broker"
					fullWidth
					margin="dense"
					variant="standard"
					defaultValue={""}
				>
					{accounts.map((account, index) => (
						<MenuItem key={index} value={account.brokerID}>
							{account.tradingName}
						</MenuItem>
					))}
				</TextField>
			)}
			<TextField
				select
				name="operation"
				label="Operation"
				fullWidth
				margin="dense"
				variant="standard"
				defaultValue={""}
			>
				{[
					{ value: "ACQUISITION", label: "Acquisition" },
					{ value: "DISPOSAL", label: "Disposal" },
				].map((option, index) => (
					<MenuItem key={index} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
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
			<TextField
				id="quantity"
				label="Quantity"
				name="quantity"
				fullWidth
				variant="standard"
			/>
			<TextField
				select
				name="currency"
				label="Currency"
				fullWidth={true}
				onChange={onCurrencyChange}
				margin="dense"
				variant="standard"
				defaultValue={""}
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
				id="grossTotalAmount"
				name="grossTotalAmount"
				label="Gross total"
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
			<MoneyField
				id="feeAmount"
				name="feeAmount"
				label="Fee"
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
			<MoneyField
				id="brokerageFeeAmount"
				name="brokerageFeeAmount"
				label="Brokerage fee"
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
