import {
	Checkbox,
	MenuItem,
	OutlinedInput,
	Select,
	SelectProps,
	SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useState } from "react";

type Props = Omit<
	SelectProps,
	"defaultValue" | "multiple" | "value" | "input"
> & {
	label: string;
	options: { value: string; label: string }[];
	defaultValue?: string[];
};
export const MultipleSelect = ({
	label,
	options,
	defaultValue,
	...props
}: Props) => {
	const [values, setValues] = useState<string[]>(defaultValue || []);
	const handleOnChange = (
		event: SelectChangeEvent<string[]>,
		child: ReactNode,
	) => {
		setValues(
			typeof event.target.value === "string"
				? event.target.value.split(",")
				: event.target.value,
		);
		if (props.onChange) props.onChange(event, child);
	};
	return (
		<Select
			multiple
			onChange={handleOnChange}
			input={<OutlinedInput label={label} />}
			value={values}
			{...props}
		>
			{options.map((option, index) => (
				<MenuItem key={index} value={option.value}>
					<Checkbox
						checked={values.indexOf(option.value) > -1}
						sx={{ p: 0, paddingRight: 0.5 }}
					/>
					{option.label}
				</MenuItem>
			))}
		</Select>
	);
};
