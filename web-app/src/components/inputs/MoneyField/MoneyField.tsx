import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useState } from "react";

type Props = TextFieldProps & {
	defaultValue?: string | number;
};
export const MoneyField = ({
	defaultValue,
	onChange,
	onBlur,
	...props
}: Props) => {
	const [value, setValue] = useState<string | number | undefined>(
		defaultValue || "",
	);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		let newValue = event.target.value;
		if (newValue.match(/[^0-9,]/g)?.length) return;
		if (onChange) onChange(event);
		else setValue(newValue);
	};
	return (
		<TextField
			value={value}
			inputProps={{
				onChange: handleChange,
				onBlur,
			}}
			{...props}
		/>
	);
};
