import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { CurrencySymbol } from "../types";

export const useCurrencyAdornment = () => {
	const [currencyAdornment, setCurrencyAdornment] = useState<string>(
		CurrencySymbol.DEFAULT,
	);
	const onCurrencyChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as keyof typeof CurrencySymbol;
		const symbol =
			value in CurrencySymbol ? CurrencySymbol[value] : CurrencySymbol.DEFAULT;
		setCurrencyAdornment(symbol);
	};
	return {
		currencyAdornment,
		onCurrencyChange,
	};
};
