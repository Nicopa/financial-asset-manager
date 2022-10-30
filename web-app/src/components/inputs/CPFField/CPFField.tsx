import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useState } from "react";

type Props = TextFieldProps & {
	defaultValue?: string;
};
export const CPFField = ({
	id,
	name,
	label,
	autoComplete,
	defaultValue,
	onChange,
	onBlur,
	...props
}: Props) => {
	const [value, setValue] = useState<string>(defaultValue || "");
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		let newValue = event.target.value.replace(/[\D]/g, "");
		if (newValue.length > 3)
			newValue = [newValue.slice(0, 3), ".", newValue.slice(3)].join("");
		if (newValue.length > 7)
			newValue = [newValue.slice(0, 7), ".", newValue.slice(7)].join("");
		if (newValue.length > 11)
			newValue = [newValue.slice(0, 11), "-", newValue.slice(11)].join("");
		if (newValue.length > 14) return;
		event.target.value = newValue;
		if (onChange) onChange(event);
		else setValue(newValue);
	};
	return (
		<TextField
			id={id || "cpf-input"}
			label={label || "CPF"}
			name={name || "cpf"}
			autoComplete={autoComplete || "cpf"}
			value={value}
			inputProps={{
				onChange: handleChange,
				onBlur,
			}}
			{...props}
		/>
	);
};
