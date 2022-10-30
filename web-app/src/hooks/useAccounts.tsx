import { useCallback, useEffect, useState } from "react";
import { getAccounts } from "../api/asset-manager";
import { Account } from "../types";

export const useAccounts = () => {
	const [accounts, setAccounts] = useState<Account[] | undefined>(undefined);
	const loadAccounts = useCallback(
		() => getAccounts().then((value) => setAccounts(value)),
		[],
	);
	useEffect(() => {
		setAccounts(undefined);
		loadAccounts();
	}, [loadAccounts, setAccounts]);
	return {
		accounts,
		setAccounts,
		loadAccounts,
	};
};
