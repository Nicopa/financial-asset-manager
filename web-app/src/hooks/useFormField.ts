import { ChangeEvent, FocusEvent, useState } from "react";
import { validateCPF } from "../utils/validateCPF";

const parseMessage = (
	message: string | undefined,
	attributes: object | undefined,
) => {
	if (!message) return "";
	if (!attributes) return message;
	let finalMessage = message;
	Object.entries(attributes).forEach(([key, value]) => {
		// eslint-disable-next-line no-useless-escape
		const regex = new RegExp(`{{\s?${key}\s?}}`, "gm");
		finalMessage = finalMessage.replace(regex, value);
	});
	return finalMessage;
};

export const validationRules = {
	required: (value: string) => {
		if (!value) return false;
		return true;
	},
	email: (value: string) => {
		return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
	},
	currency: (value: string) => {
		return /^[0-9]+([,.]{1}[0-9]{1,2})?$/g.test(value);
	},
	cpf: (value: string) => {
		return validateCPF(value);
	},
	equals: (value: string) => {},
	CEPFormat: (value: string) => {
		return /\d{5}-\d{3}/.test(value);
	},
	minAge18: (value: string) => {
		const parts = value.split("-");
		const valueInDate = new Date(
			parseInt(parts[0]),
			parseInt(parts[1]),
			parseInt(parts[2]),
		);
		const maxDate = new Date(
			new Date().getFullYear() - 18,
			new Date().getMonth(),
			new Date().getDate(),
		);
		return valueInDate.getTime() < maxDate.getTime();
	},
	minLength: (value: string, attributes: ValidationsAttributes | undefined) => {
		if (!attributes || !attributes.minLength) return !!value.length;
		return value.length >= attributes.minLength;
	},
	password: (value: string) => {
		if (!/[a-z]/.exec(value)) return false;
		if (!/[A-Z]/.exec(value)) return false;
		if (!/\d/.exec(value)) return false;
		if (!/[!@#$%*]/.exec(value)) return false;
		return true;
	},
	username: (value: string) => {
		if (value.match(/[^\w!@#$%&*\-_.+=]/gm)) return false;
		return true;
	},
};
export interface ValidationsAttributes {
	minLength?: number;
}
export type useFormFieldProps = {
	name: string;
	initialValue?: string;
	onChange?: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	validations?: Array<{
		rule: (value: string, attributes?: object) => boolean;
		message?: string;
		attributes?: ValidationsAttributes;
	}>;
};
export const useFormField = (
	props: useFormFieldProps | undefined = undefined,
) => {
	const [value, setValue] = useState<string>(props?.initialValue || "");
	const [focused, setFocused] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
	const isValid = (): boolean => {
		if (props?.validations)
			for (const validation of props.validations) {
				if (!validation.rule(value, validation.attributes)) {
					return false;
				}
			}
		return true;
	};
	const getValidationMessages = () => {
		let messages: string[] = [];
		if (props?.validations)
			props?.validations?.forEach((validation) => {
				const parsedMessage = parseMessage(
					validation.message,
					validation.attributes,
				);
				if (!validation.rule(value, validation.attributes)) {
					messages.push(parsedMessage);
				}
			});
		return messages;
	};
	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setValue(event.target.value);
		if (props?.onChange) props.onChange(event);
	};
	const handleBlur = (
		event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (!focused) setFocused(true);
		if (!isValid()) {
			setShowError(true);
			const messages = getValidationMessages();
			setErrorMessages(messages);
		} else setShowError(false);
		if (props?.onBlur) props.onBlur(event);
	};
	return {
		value,
		focused,
		showError,
		isValid,
		errorMessages,
		onChange: handleChange,
		onBlur: handleBlur,
	};
};
