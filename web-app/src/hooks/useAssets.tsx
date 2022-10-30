import { useCallback, useEffect, useState } from "react";
import { getAssets } from "../api/asset-manager";

export const useAssets = () => {
	const [assets, setAssets] =
		useState<{ id: string; name: string }[] | undefined>(undefined);
	const loadAssets = useCallback(async () => {
		setAssets(await getAssets());
	}, []);
	useEffect(() => {
		setAssets(undefined);
		loadAssets();
	}, [loadAssets, setAssets]);
	return {
		assets,
		setAssets,
		loadAssets,
	};
};
