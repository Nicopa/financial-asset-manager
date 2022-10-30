export type NavigationConfigItem = {
	title: string;
	path: string;
	icon: string;
	info?: string | JSX.Element;
	children?: {
		title: string;
		path: string;
		icon: string;
		info?: string | JSX.Element;
	}[];
};
export const navigationConfig: NavigationConfigItem[] = [
	/* {
		title: "Dashboard",
		path: "/",
		icon: "eva:pie-chart-2-fill",
	}, */
	{
		title: "Wallet",
		path: "/wallet",
		icon: "entypo:wallet",
	},
	{
		title: "Tradings",
		path: "/tradings",
		icon: "eva:layers-fill",
	},
	{
		title: "Cash Flow",
		path: "/cash-flow",
		icon: "eva:flip-outline",
	},
	{
		title: "Accounts",
		path: "/accounts",
		icon: "fluent:building-bank-48-filled",
	},
	{
		title: "Earnings",
		path: "/earnings",
		icon: "humbleicons:money",
	},
];
