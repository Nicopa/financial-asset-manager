import { Box, MenuItem, TextField } from "@mui/material";
import { FormEventHandler } from "react";
import { Broker } from "../../types";

type Props = {
	id: string;
	brokers?: Broker[];
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const AccountForm = ({ id, brokers, onSubmit }: Props) => {
	return (
		<Box id={id} component="form" onSubmit={onSubmit}>
			<TextField
				select
				name="broker"
				label="Broker"
				fullWidth={true}
				margin="dense"
				variant="standard"
				defaultValue={brokers && brokers.length ? brokers[0].id : ""}
			>
				{brokers &&
					brokers.map((option, index) => (
						<MenuItem key={index} value={option.id}>
							{option.tradingName}
						</MenuItem>
					))}
			</TextField>
		</Box>
	);
};
