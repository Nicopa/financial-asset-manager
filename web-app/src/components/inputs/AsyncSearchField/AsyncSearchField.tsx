import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

export type AsyncSearchFieldOption = {
	value: string;
	label: string;
};
export type AsyncSearchFieldProps = TextFieldProps & {
	loadOptions: (value: string) => Promise<AsyncSearchFieldOption[]>;
};
export const AsyncSearchField = ({
	loadOptions,
	name,
	label,
}: AsyncSearchFieldProps) => {
	const [value, setValue] = useState<AsyncSearchFieldOption | null>(null);
	const [inputValue, setInputValue] = useState<string>("");
	const [options, setOptions] = useState<readonly AsyncSearchFieldOption[]>([
		{ label: "", value: "" },
	]);
	return (
		<>
			<input type="hidden" value={value?.value} name={name} />
			<Autocomplete
				filterOptions={(x) => x}
				options={options}
				autoComplete
				includeInputInList
				filterSelectedOptions
				value={value || null}
				inputValue={inputValue}
				onChange={(event: any, newValue: AsyncSearchFieldOption | null) =>
					setValue(newValue)
				}
				onInputChange={(event, newInputValue) => {
					loadOptions(newInputValue).then((options) => {
						if (options.length) setOptions(options);
						else setOptions([{ label: "", value: "" }]);
					});
					setInputValue(newInputValue);
				}}
				isOptionEqualToValue={(option, value) => option.value === value.value}
				renderInput={(params) => {
					return (
						<TextField
							{...params}
							label={label}
							fullWidth
							margin="dense"
							variant="standard"
						/>
					);
				}}
			/>
		</>
	);
};
