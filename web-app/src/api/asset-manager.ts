import {
	Account,
	Credentials,
	Currency,
	WalletAsset,
	WalletPieData,
} from "../types";
import { apiURL } from "../config";
export const requestSignUp = async (requestData: {
	username: string;
	fullname: string;
	password: string;
	cpf: string;
}) => {
	const body = JSON.stringify(requestData);
	const headers = new Headers({
		"Content-type": "application/json",
		"Content-Length": body.length.toString(),
	});
	const response = await fetch(apiURL + "/signup", {
		method: "POST",
		body,
		headers,
	});
	return {
		isSuccess: response.ok,
	};
};
export const getAuthToken = async (
	credentials: Credentials,
): Promise<{ isSuccess: boolean; data: any }> => {
	const body = JSON.stringify(credentials);
	const headers = new Headers({
		"Content-type": "application/json",
		"Content-Length": body.length.toString(),
	});
	const response = await fetch(apiURL + "/login", {
		method: "POST",
		body,
		headers,
	});
	const data = await response.json();
	return {
		isSuccess: response.ok,
		data,
	};
};

export const getUserData = async (): Promise<{
	isSuccess: boolean;
	data: any;
}> => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + "/investor", {
		method: "GET",
		headers,
	});
	const data = await response.json();
	return {
		isSuccess: response.ok,
		data,
	};
};

export const getBrokersForAccount = async () => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + "/brokers/available", {
		method: "GET",
		headers,
	});
	return response.json();
};

export interface GetTradingsProps {
	brokerID?: string;
	assetName?: string;
	assetType?: string;
	operation?: string;
	operationDate?: string;
	operationDateComparisonOperator?: string;
	settlementDate?: string;
	settlementDateComparisonOperator?: string;
	currency?: string;
	grossTotalAmount?: number;
	grossTotalAmountComparisonOperator?: string;
	limit?: string;
	offset?: string;
}
export const getTradings = async (requestData: GetTradingsProps) => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	let query: { [key: string]: any } = Object.entries(requestData).filter(
		(value) => (value[1] ? true : false),
	);
	const response = await fetch(
		apiURL + "/tradings?" + new URLSearchParams(query).toString(),
		{
			method: "GET",
			headers,
		},
	);
	return await response.json();
};

export const getAccounts = async (): Promise<Account[]> => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + "/accounts", {
		method: "GET",
		headers,
	});
	const results: {
		id: string;
		tradingName: string;
		thumbnail?: string;
		BRLbalance: number;
		USDbalance: number;
	}[] = await response.json();
	return results.map(({ id, ...data }) => ({
		brokerID: id,
		...data,
	}));
};

export const createAccount = async (requestData: { brokerID: string }) => {
	const body = JSON.stringify(requestData);
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
		"Content-type": "application/json",
		"Content-Length": body.length.toString(),
	});
	const response = await fetch(apiURL + "/account", {
		method: "POST",
		body,
		headers,
	});
	return {
		isSuccess: response.ok,
	};
};

export const createDeposit = async (requestData: {
	brokerID: string;
	value: {
		amount: number;
		currency: Currency;
	};
	date: Date;
}) => {
	const body = JSON.stringify(requestData);
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
		"Content-type": "application/json",
		"Content-Length": body.length.toString(),
	});
	const response = await fetch(apiURL + "/deposit", {
		method: "POST",
		body,
		headers,
	});
	return {
		isSuccess: response.ok,
	};
};
export const deleteDeposit = async (id: string) => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + `/deposit/${id}`, {
		method: "DELETE",
		headers,
	});
	return response.status;
};
export interface GetCashFlowsProps {
	brokerID?: string;
	source?: string;
	valueAmount?: number;
	valueAmountComparisonOperator?: string;
	valueCurrency?: string;
	operation?: string;
	operationDate?: string;
	operationDateComparisonOperator?: string;
	settlementDate?: string;
	settlementDateComparisonOperator?: string;
	limit?: string;
	offset?: string;
}
export const getCashFlows = async (requestData: GetCashFlowsProps) => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	let query: { [key: string]: any } = Object.entries(requestData).filter(
		(value) => (value[1] ? true : false),
	);
	const response = await fetch(
		apiURL + "/cash-flows?" + new URLSearchParams(query).toString(),
		{
			method: "GET",
			headers,
		},
	);
	return await response.json();
};
export const createWithdraw = async (requestData: {
	brokerID: string;
	value: {
		amount: number;
		currency: Currency;
	};
	date: Date;
}) => {
	const body = JSON.stringify(requestData);
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
		"Content-type": "application/json",
		"Content-Length": body.length.toString(),
	});
	const response = await fetch(apiURL + "/withdraw", {
		method: "POST",
		body,
		headers,
	});
	return {
		isSuccess: response.ok,
	};
};
export const deleteWithdraw = async (id: string) => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + `/withdraw/${id}`, {
		method: "DELETE",
		headers,
	});
	return response.status;
};
export const deleteTrading = async (id: string) => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + `/trading/${id}`, {
		method: "DELETE",
		headers,
	});
	return response.status;
};
export const getAssets = async (): Promise<{ id: string; name: string }[]> => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + "/assets", {
		method: "GET",
		headers,
	});
	const results: {
		id: string;
		name: string;
	}[] = await response.json();
	return results;
};
export const findAssetsByName = async (
	name: string,
): Promise<{ id: string; name: string }[]> => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	let query: { [key: string]: any } = {
		name,
	};
	const response = await fetch(
		apiURL + "/assets?" + new URLSearchParams(query).toString(),
		{
			method: "GET",
			headers,
		},
	);
	return await response.json();
};

export const createTrading = async (requestData: {
	brokerID: string;
	assetID: string;
	operation: string;
	operationDate: Date;
	settlementDate: Date;
	quantity: number;
	grossTotal: {
		amount: number;
		currency: Currency;
	};
	fee?: {
		amount: number;
		currency: Currency;
	};
	brokerageFee?: {
		amount: number;
		currency: Currency;
	};
}) => {
	const body = JSON.stringify(requestData);
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
		"Content-type": "application/json",
		"Content-Length": body.length.toString(),
	});
	const response = await fetch(apiURL + "/trading", {
		method: "POST",
		body,
		headers,
	});
	return {
		isSuccess: response.ok,
	};
};

export const getWallet = async (): Promise<WalletAsset[]> => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + "/wallet", {
		method: "GET",
		headers,
	});
	const results: WalletAsset[] = await response.json();
	return results;
};
export const getWalletPieData = async (): Promise<WalletPieData> => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + "/wallet/pie-data", {
		method: "GET",
		headers,
	});
	const results: WalletPieData = await response.json();
	return results;
};

export const createEarning = async (requestData: {
	brokerID: string;
	value: {
		amount: number;
		currency: Currency;
	};
	operationDate: Date;
	settlementDate: Date;
	assetID: string;
	type: string;
	quantity: number;
}) => {
	const body = JSON.stringify(requestData);
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
		"Content-type": "application/json",
		"Content-Length": body.length.toString(),
	});
	const response = await fetch(apiURL + "/earning", {
		method: "POST",
		body,
		headers,
	});
	return {
		isSuccess: response.ok,
	};
};
export interface GetEarningsProps {
	brokerID?: string;
	assetID?: string;
	currency?: string;
	operation?: string;
	operationDate?: string;
	settlementDate?: string;
	limit?: string;
	offset?: string;
}
export const getEarnings = async (requestData: GetEarningsProps) => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	let query: { [key: string]: any } = Object.entries(requestData).filter(
		(value) => (value[1] ? true : false),
	);
	const response = await fetch(
		apiURL + "/earnings?" + new URLSearchParams(query).toString(),
		{
			method: "GET",
			headers,
		},
	);
	return await response.json();
};
export const deleteEarning = async (id: string) => {
	const headers = new Headers({
		authorization: `Bearer ${localStorage.getItem("auth_token")}`,
	});
	const response = await fetch(apiURL + `/earning/${id}`, {
		method: "DELETE",
		headers,
	});
	return response.status;
};
