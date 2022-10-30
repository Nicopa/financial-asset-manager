import { useFormField, useFormFieldProps } from "./useFormField";

export type useFormProps = useFormFieldProps[];
export const useForm = (fieldsProps: useFormProps) => {
	const fields: {
		[key: string]: ReturnType<typeof useFormField>;
	} = {};
	for (const props of fieldsProps) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		fields[props.name] = useFormField(props);
	}
	const isValid = (): boolean => {
		for (const name in fields) {
			if (!fields[name].isValid()) return false;
		}
		return true;
	};
	return {
		fields,
		isValid,
	};
};
